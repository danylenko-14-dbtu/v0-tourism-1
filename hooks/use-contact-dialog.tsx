'use client'

import { createContext, useContext, useState } from 'react'

interface ContactDialogContextType {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(undefined)

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <ContactDialogContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ContactDialogContext.Provider>
  )
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext)
  if (context === undefined) {
    throw new Error('useContactDialog must be used within a ContactDialogProvider')
  }
  return context
}
