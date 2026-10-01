"use client"

import * as React from "react"

interface HelpChatContextValue {
  isChatOpen: boolean
  isEmailModalOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  openEmailSupport: () => void
  closeEmailSupport: () => void
}

const HelpChatContext = React.createContext<HelpChatContextValue | undefined>(undefined)

export function HelpChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = React.useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false)

  const openChat = React.useCallback(() => {
    setIsEmailModalOpen(false)
    setIsChatOpen(true)
  }, [])

  const closeChat = React.useCallback(() => {
    setIsChatOpen(false)
  }, [])

  const toggleChat = React.useCallback(() => {
    setIsChatOpen((prev) => {
      if (!prev) {
        setIsEmailModalOpen(false)
      }
      return !prev
    })
  }, [])

  const openEmailSupport = React.useCallback(() => {
    setIsChatOpen(false)
    setIsEmailModalOpen(true)
  }, [])

  const closeEmailSupport = React.useCallback(() => {
    setIsEmailModalOpen(false)
  }, [])

  // Listen to hash changes across the entire app for deep links (#chat-soporte or #correo-soporte)
  React.useEffect(() => {
    const handleHashCheck = () => {
      if (typeof window === "undefined") return
      if (window.location.hash === "#chat-soporte") {
        openChat()
      } else if (window.location.hash === "#correo-soporte") {
        openEmailSupport()
      }
    }

    handleHashCheck()
    window.addEventListener("hashchange", handleHashCheck)
    return () => window.removeEventListener("hashchange", handleHashCheck)
  }, [openChat, openEmailSupport])

  const value = React.useMemo<HelpChatContextValue>(
    () => ({
      isChatOpen,
      isEmailModalOpen,
      openChat,
      closeChat,
      toggleChat,
      openEmailSupport,
      closeEmailSupport,
    }),
    [
      isChatOpen,
      isEmailModalOpen,
      openChat,
      closeChat,
      toggleChat,
      openEmailSupport,
      closeEmailSupport,
    ]
  )

  return (
    <HelpChatContext.Provider value={value}>
      {children}
    </HelpChatContext.Provider>
  )
}

export function useHelpChat(): HelpChatContextValue {
  const context = React.useContext(HelpChatContext)
  if (!context) {
    throw new Error("useHelpChat debe ser utilizado dentro de un <HelpChatProvider>")
  }
  return context
}
