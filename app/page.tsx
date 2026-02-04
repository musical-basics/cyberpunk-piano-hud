"use client"

import { PianoHUD } from "@/components/hud/piano-hud"
import { useSpeech } from "@/hooks/use-speech"
import { useVibeEngine } from "@/hooks/use-vibe-engine"
import { useState } from "react"

export default function HUDPage() {
  const { transcript } = useSpeech()
  const { totalHits, nps, isCritical, hudRef, statusLog } = useVibeEngine()

  // Combine default messages with the live MIDI logs
  const displayMessages = [
    "System initialized...",
    "Vibe Engine: ONLINE",
    ...statusLog
  ]

  return (
    <main className="relative min-h-screen bg-transparent overflow-hidden">
      <div
        ref={hudRef}
        className="relative w-full h-full transition-transform duration-75 ease-out will-change-transform"
      >
        <PianoHUD
          totalHits={totalHits}
          nps={nps}
          maxNps={35}
          messages={displayMessages}
          currentSubtitle={transcript}
          isCritical={isCritical}
        />
      </div>
    </main>
  )
}
