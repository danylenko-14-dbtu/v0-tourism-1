"use client"

import { useEffect, useRef, useState } from "react"
import type { LeafletMouseEvent, Map as LeafletMap } from "leaflet"

interface AboutContactMapProps {
  latitude: number
  longitude: number
  markerLabel: string
}

export function AboutContactMap({
  latitude,
  longitude,
  markerLabel,
}: AboutContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let isMounted = true
    let preloadTimer: number | undefined
    let idleHandle: number | undefined

    async function initMap() {
      const L = await import("leaflet")

      if (!isMounted || !mapRef.current || mapInstanceRef.current) {
        return
      }

      const center: [number, number] = [latitude, longitude]
      const map = L.map(mapRef.current, {
        center,
        zoom: 17,
        scrollWheelZoom: false,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      const icon = L.divIcon({
        className: "",
        html: '<span class="about-contact-map-marker"></span>',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      L.marker(center, { icon, title: markerLabel }).addTo(map).bindPopup(markerLabel)

      map.once("load", () => {
        if (isMounted) {
          setIsReady(true)
        }
      })

      map.on("tileerror", () => {
        if (isMounted) {
          setIsReady(true)
        }
      })

      map.whenReady(() => {
        window.setTimeout(() => {
          map.invalidateSize()
          if (isMounted) {
            setIsReady(true)
          }
        }, 0)
      })

      map.on("click", (event: LeafletMouseEvent) => {
        event.originalEvent.stopPropagation()
      })

      mapInstanceRef.current = map
    }

    const startPreload = () => {
      void initMap()
    }

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(startPreload, { timeout: 1200 })
    } else {
      preloadTimer = window.setTimeout(startPreload, 250)
    }

    return () => {
      isMounted = false
      if (idleHandle) {
        window.cancelIdleCallback(idleHandle)
      }
      if (preloadTimer) {
        window.clearTimeout(preloadTimer)
      }
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [latitude, longitude, markerLabel])

  return (
    <div className="about-contact-map relative isolate z-0 h-[360px] w-full overflow-hidden rounded-md border border-border/60 bg-muted shadow-sm lg:h-full lg:min-h-[520px]">
      <div ref={mapRef} className="h-full w-full" aria-label={markerLabel} />
      {!isReady ? (
        <div className="absolute inset-0 overflow-hidden bg-muted" aria-hidden="true">
          <div className="absolute inset-x-0 top-1/2 h-px bg-border/70" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/70" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary shadow-lg" />
          <div className="absolute inset-0 -translate-x-full animate-[map-skeleton_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-background/55 to-transparent" />
        </div>
      ) : null}
    </div>
  )
}
