"use client"

import { PianoHUD } from "@/components/hud/piano-hud"
import { useSpeech } from "@/hooks/use-speech"
import { useVibeEngine } from "@/hooks/use-vibe-engine"
import { useState } from "react"

export default function HUDPage() {
  // Pull in our custom hooks
  const { transcript } = useSpeech()
  const { totalHits, nps, isCritical, hudRef } = useVibeEngine()

  // Simple message log (combines system logs + voice history if you want)
  // For now, we'll just keep a static list or merge them.
  const [messages] = useState<string[]>([
    "System initialized...",
    "MIDI Listening...",
    "Vibe Engine: ONLINE"
  ])

  // Optional: Add transcript to logs periodically if it changes?
  // For now, we pass the live transcript directly.

  return (
    <main className="relative min-h-screen bg-transparent overflow-hidden">
      {/* This div wraps the HUD. 
        The 'hudRef' allows our Vibe Engine to grab this specific div 
        and shake it violently without re-rendering React.
      */}
      <div
        ref={hudRef}
        className="relative w-full h-full transition-transform duration-75 ease-out will-change-transform"
      >
        <PianoHUD
          totalHits={totalHits}
          nps={nps}
          maxNps={35} // Adjust this based on your max speed
          messages={messages}
          currentSubtitle={transcript}
          isCritical={isCritical}
        />
      </div>
    </main>
  )
}
