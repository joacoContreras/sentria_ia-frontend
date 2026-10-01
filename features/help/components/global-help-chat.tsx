"use client"

import * as React from "react"
import { MessageSquare, X } from "lucide-react"
import { useHelpChat } from "../hooks/use-help-chat"
import { HelpChatModal } from "./help-chat-modal"
import { SupportEmailModal } from "./support-email-modal"

export function GlobalHelpChat() {
    const {
    isChatOpen,
    isEmailModalOpen,
    toggleChat,
    closeChat,
    openEmailSupport,
    closeEmailSupport,
  } = useHelpChat()

  return (
    <>
      {/* Floating Interactive Chat Launcher Button (Global) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={toggleChat}
          className="group relative flex items-center gap-2.5 rounded-full bg-primary px-4 py-3 sm:px-4.5 sm:py-3.5 text-white shadow-lg shadow-primary/20 hover:bg-primary-container hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 active:scale-95 cursor-pointer border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={isChatOpen ? "Cerrar chat de asistencia" : "Abrir chat de asistencia médica y soporte"}
          aria-expanded={isChatOpen}
        >
          {isChatOpen ? (
            <>
              <X className="h-4 w-4 sm:h-[18px] sm:w-[18px] transition-transform duration-200" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold tracking-tight">
                Cerrar Chat
              </span>
            </>
          ) : (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <MessageSquare className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold tracking-tight">
                Chat de Ayuda
              </span>
            </>
          )}
        </button>
      </div>

      {/* Global Modals */}
      <HelpChatModal
        isOpen={isChatOpen}
        onClose={closeChat}
        onOpenEmailSupport={openEmailSupport}
      />

      <SupportEmailModal
        isOpen={isEmailModalOpen}
        onClose={closeEmailSupport}
      />
    </>
  )
}
