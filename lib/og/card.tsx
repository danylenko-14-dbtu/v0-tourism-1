// Pure JSX component without any loading logic.
// Satori renders it — only flex, inline styles, img.

import { formatDate, type OgParams } from "./params";

const COLORS = {
  bg: "#edeae4",
  text: "#1a1a1a",
  textMuted: "#6b6b6b",
  textLight: "#9a9a9a",
  badge: "#e0dcd6",
  badgeBorder: "#c4bfba",
  badgeText: "#5a5a5a",
  divider: "#d4d0cb",
  accent: "#1f2937",
} as const;

interface OgCardProps extends OgParams {
  logoDataUrl: string;
}

export function OgCard({ logoDataUrl, ...params }: OgCardProps) {
  const { title, excerpt, author, avatar, cover, category, date, locale } = params;

  const formattedDate = formatDate(date, locale);
  const brandName = locale === "en" ? "State Biotechnological University" : "Кафедра туризму ДБТУ";
  const titleFontSize = title.length > 55 ? 46 : title.length > 35 ? 52 : 58;
  const showExcerpt = !!excerpt && title.length < 45;

  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "630px",
        backgroundColor: COLORS.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter",
      }}
    >
      {/* ── Left column ─────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "610px",
          height: "100%",
          padding: "52px 56px",
        }}
      >
        {/* Logo + department name */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {logoDataUrl && (
            <img
              src={logoDataUrl}
              style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "contain" }}
            />
          )}
          <span style={{ fontSize: "16px", color: COLORS.textMuted, letterSpacing: "0.04em" }}>
            {brandName}
          </span>
        </div>

        {/* Badge + title + excerpt */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "6px 18px",
              borderRadius: "999px",
              backgroundColor: COLORS.badge,
              border: `1px solid ${COLORS.badgeBorder}`,
            }}
          >
            <span style={{ fontSize: "15px", color: COLORS.badgeText, fontWeight: 500 }}>
              {category}
            </span>
          </div>

          <div
            style={{
              fontSize: `${titleFontSize}px`,
              fontWeight: 700,
              color: COLORS.text,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>

          {showExcerpt && (
            <div style={{ fontSize: "19px", color: COLORS.textMuted, lineHeight: 1.4 }}>
              {excerpt}
            </div>
          )}
        </div>

        {/* Author + date */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ width: "48px", height: "2px", backgroundColor: COLORS.divider }} />

          {author && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {avatar ? (
                <img
                  src={avatar}
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${COLORS.badgeBorder}`,
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    backgroundColor: COLORS.accent,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                    {[...author][0]}
                  </span>
                </div>
              )}
              <span style={{ fontSize: "18px", color: COLORS.text, fontWeight: 500 }}>
                {author}
              </span>
            </div>
          )}

          {formattedDate && (
            <span style={{ fontSize: "15px", color: COLORS.textLight }}>{formattedDate}</span>
          )}
        </div>
      </div>

      {/* ── Right column — cover ───────────────────────── */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 0,
          top: 0,
          width: "570px",
          height: "100%",
        }}
      >
        {/* Gradient overlay — blends with background */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "120px",
            height: "100%",
            background: `linear-gradient(to right, ${COLORS.bg}, transparent)`,
            zIndex: 2,
            display: "flex",
          }}
        />

        {cover ? (
          <img src={cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              backgroundColor: "#ddd8d0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "80px", opacity: 0.2 }}>✈</span>
          </div>
        )}
      </div>
    </div>
  );
}
