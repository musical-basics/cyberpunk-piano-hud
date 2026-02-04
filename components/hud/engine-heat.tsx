"use client"

import { cn } from "@/lib/utils"

interface EngineHeatProps {
  nps: number
  maxNps?: number
  className?: string
}

export function EngineHeat({ nps, maxNps = 30, className }: EngineHeatProps) {
  const percentage = Math.min((nps / maxNps) * 100, 100)
  const circumference = 2 * Math.PI * 60 // radius = 60
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  // Warning levels
  const isWarning = percentage >= 70
  const isCritical = percentage >= 90
  
  return (
    <div className={cn("relative", className)}>
      {/* Module frame - the critical-overload class goes here */}
      <div className="border-2 border-[rgb(var(--neon-pink))] bg-[rgb(var(--neon-pink))/0.05] box-glow-pink p-6 relative">
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[rgb(var(--neon-cyan))]" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[rgb(var(--neon-cyan))]" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[rgb(var(--neon-cyan))]" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[rgb(var(--neon-cyan))]" />
        
        {/* WARNING indicator */}
        <div className="absolute top-2 right-3 text-[8px] tracking-widest">
          {isCritical ? (
            <span className="text-[rgb(var(--neon-red))] glow-red animate-pulse">!! CRITICAL !!</span>
          ) : isWarning ? (
            <span className="text-[rgb(var(--neon-pink))] glow-pink">! WARNING</span>
          ) : (
            <span className="text-[rgb(var(--neon-cyan))] glow-cyan opacity-50">NOMINAL</span>
          )}
        </div>
        
        {/* Label */}
        <div className="heat-label text-[10px] text-[rgb(var(--neon-cyan))] glow-cyan mb-4 tracking-widest">
          {'>'} ENGINE_HEAT [NPS]
        </div>
        
        {/* Main display area */}
        <div className="flex items-center gap-6">
          {/* Circular progress ring */}
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              {/* Background ring */}
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="rgba(0, 255, 255, 0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                className="heat-ring transition-all duration-300"
                cx="70"
                cy="70"
                r="60"
                stroke={isCritical ? "rgb(var(--neon-red))" : isWarning ? "rgb(var(--neon-pink))" : "rgb(var(--neon-cyan))"}
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="square"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  filter: `drop-shadow(0 0 10px ${isCritical ? 'rgb(var(--neon-red))' : isWarning ? 'rgb(var(--neon-pink))' : 'rgb(var(--neon-cyan))'})`
                }}
              />
              {/* Tick marks */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="70"
                  y1="15"
                  x2="70"
                  y2="20"
                  stroke="rgb(var(--neon-cyan))"
                  strokeWidth="1"
                  opacity="0.5"
                  transform={`rotate(${i * 30} 70 70)`}
                />
              ))}
            </svg>
            
            {/* Center value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span 
                className={cn(
                  "heat-value text-4xl font-pixel",
                  isCritical ? "text-[rgb(var(--neon-red))] glow-red" : 
                  isWarning ? "text-[rgb(var(--neon-pink))] glow-pink" : 
                  "text-[rgb(var(--neon-cyan))] glow-cyan"
                )}
              >
                {nps.toFixed(1)}
              </span>
              <span className="text-[8px] text-[rgb(var(--neon-pink))] mt-1 tracking-wider">
                N/SEC
              </span>
            </div>
          </div>
          
          {/* Vertical bar meter */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-[8px] text-[rgb(var(--neon-pink))] tracking-wider">MAX</div>
            <div className="w-8 h-32 border-2 border-[rgb(var(--neon-cyan))] relative bg-[rgb(0,0,0)]/0.5">
              {/* Fill bar */}
              <div 
                className={cn(
                  "heat-bar absolute bottom-0 left-0 right-0 transition-all duration-300",
                  isCritical ? "bg-[rgb(var(--neon-red))]" : 
                  isWarning ? "bg-[rgb(var(--neon-pink))]" : 
                  "bg-[rgb(var(--neon-cyan))]"
                )}
                style={{ 
                  height: `${percentage}%`,
                  boxShadow: `0 0 15px ${isCritical ? 'rgb(var(--neon-red))' : isWarning ? 'rgb(var(--neon-pink))' : 'rgb(var(--neon-cyan))'}`
                }}
              />
              {/* Graduation marks */}
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute left-0 right-0 h-[1px] bg-[rgb(var(--neon-cyan))]/30"
                  style={{ bottom: `${(i + 1) * 10}%` }}
                />
              ))}
            </div>
            <div className="text-[8px] text-[rgb(var(--neon-cyan))] tracking-wider">0</div>
          </div>
          
          {/* Stats panel */}
          <div className="text-[8px] space-y-2 hidden md:block">
            <div className="flex justify-between gap-4">
              <span className="text-[rgb(var(--neon-pink))]">PEAK:</span>
              <span className="text-[rgb(var(--neon-cyan))] glow-cyan">{(nps * 1.2).toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[rgb(var(--neon-pink))]">AVG:</span>
              <span className="text-[rgb(var(--neon-cyan))] glow-cyan">{(nps * 0.7).toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[rgb(var(--neon-pink))]">LOAD:</span>
              <span className="text-[rgb(var(--neon-cyan))] glow-cyan">{percentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-2 left-4 right-4 flex gap-1">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1 flex-1",
                i < Math.floor(percentage / 5) 
                  ? isCritical ? "bg-[rgb(var(--neon-red))]" : isWarning ? "bg-[rgb(var(--neon-pink))]" : "bg-[rgb(var(--neon-cyan))]"
                  : "bg-[rgb(var(--neon-cyan))]/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
