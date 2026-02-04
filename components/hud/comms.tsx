"use client"

interface CommsProps {
  messages: string[]
  currentSubtitle?: string
}

export function Comms({ messages, currentSubtitle }: CommsProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Module frame */}
      <div className="border-2 border-[rgb(var(--neon-cyan))] bg-[rgb(0,0,0)]/80 box-glow-cyan p-4 relative">
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[rgb(var(--neon-pink))]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[rgb(var(--neon-pink))]" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[rgb(var(--neon-pink))]" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[rgb(var(--neon-pink))]" />

        {/* Header bar */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[rgb(var(--neon-cyan))]/30">
          <div className="text-[10px] text-[rgb(var(--neon-pink))] glow-pink tracking-widest">
            {">"} COMMS_TERMINAL
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[rgb(var(--neon-cyan))] animate-pulse" />
            <span className="text-[8px] text-[rgb(var(--neon-cyan))]">LIVE</span>
          </div>
        </div>

        {/* Message log area */}
        <div className="space-y-1 mb-4 max-h-24 overflow-hidden">
          {messages.slice(-4).map((msg, i) => (
            <div
              key={`msg-${i}`}
              className="text-[10px] text-[rgb(var(--neon-cyan))]/50 font-mono"
              style={{ opacity: 0.3 + i * 0.2 }}
            >
              <span className="text-[rgb(var(--neon-pink))]/50">[LOG]</span> {msg}
            </div>
          ))}
        </div>

        {/* Current subtitle - main display */}
        <div className="relative bg-[rgb(var(--neon-cyan))]/5 border border-[rgb(var(--neon-cyan))]/30 p-3">
          <div className="text-[8px] text-[rgb(var(--neon-pink))] mb-2">{">"} CURRENT_OUTPUT:</div>
          <div className="text-sm md:text-base text-[rgb(var(--neon-cyan))] glow-cyan leading-relaxed cursor-blink">
            {currentSubtitle || "AWAITING INPUT..."}
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-3 flex items-center justify-between text-[8px]">
          <div className="flex items-center gap-4">
            <span className="text-[rgb(var(--neon-pink))]">
              BUFFER: <span className="text-[rgb(var(--neon-cyan))]">OK</span>
            </span>
            <span className="text-[rgb(var(--neon-pink))]">
              LATENCY: <span className="text-[rgb(var(--neon-cyan))]">{"<"}1ms</span>
            </span>
          </div>
          <div className="text-[rgb(var(--neon-cyan))]/50">v2.077.NEON</div>
        </div>

        {/* Decorative scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="w-full h-[2px] bg-[rgb(var(--neon-cyan))] animate-[scanline_4s_linear_infinite]" />
        </div>
      </div>
    </div>
  )
}
