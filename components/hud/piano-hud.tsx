"use client"

import { cn } from "@/lib/utils"
import { TotalHits } from "./total-hits"
import { EngineHeat } from "./engine-heat"
import { Comms } from "./comms"

interface PianoHUDProps {
  totalHits: number
  nps: number
  maxNps?: number
  messages: string[]
  currentSubtitle?: string
  isCritical?: boolean
  className?: string
}

export function PianoHUD({
  totalHits,
  nps,
  maxNps = 30,
  messages,
  currentSubtitle,
  isCritical = false,
  className
}: PianoHUDProps) {
  return (
    <div className={cn("fixed inset-0 pointer-events-none p-4 md:p-6", className)}>
      {/* Two-column layout */}
      <div className="absolute inset-4 md:inset-6 flex gap-4">
        
        {/* LEFT COLUMN - TOTAL HITS on top, COMMS below */}
        <div className="flex flex-col gap-4 flex-1 max-w-[65%]">
          {/* TOTAL HITS - top-left */}
          <div className="pointer-events-auto">
            <TotalHits count={totalHits} />
          </div>
          
          {/* COMMS TERMINAL - below TOTAL HITS, fills remaining space */}
          <div className="pointer-events-auto flex-1">
            <Comms messages={messages} currentSubtitle={currentSubtitle} />
          </div>
        </div>
        
        {/* RIGHT COLUMN - ENGINE HEAT */}
        <div className={cn("pointer-events-auto", isCritical && "critical-overload")}>
          <EngineHeat nps={nps} maxNps={maxNps} />
        </div>
      </div>
      
      {/* Version tag - bottom right */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[8px] text-[rgb(var(--neon-cyan))]/50">
        v2.077.NEON
      </div>
      
      {/* Decorative corner brackets for overall HUD */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[rgb(var(--neon-pink))]/30" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[rgb(var(--neon-pink))]/30" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[rgb(var(--neon-pink))]/30" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[rgb(var(--neon-pink))]/30" />
    </div>
  )
}
