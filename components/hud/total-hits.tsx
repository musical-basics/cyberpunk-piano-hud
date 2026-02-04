"use client"

interface TotalHitsProps {
  count: number
}

export function TotalHits({ count }: TotalHitsProps) {
  const formattedCount = count.toString().padStart(7, '0')
  
  return (
    <div className="relative">
      {/* Module frame */}
      <div className="border-2 border-[rgb(var(--neon-cyan))] bg-[rgb(var(--neon-cyan))/0.05] box-glow-cyan p-4 relative">
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[rgb(var(--neon-pink))]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[rgb(var(--neon-pink))]" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[rgb(var(--neon-pink))]" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[rgb(var(--neon-pink))]" />
        
        {/* Label */}
        <div className="text-[10px] text-[rgb(var(--neon-pink))] glow-pink mb-2 tracking-widest">
          {'>'} TOTAL_HITS
        </div>
        
        {/* Digital counter */}
        <div className="text-3xl md:text-4xl text-[rgb(var(--neon-cyan))] glow-cyan font-pixel tracking-wider">
          {formattedCount}
        </div>
        
        {/* Decorative scanline */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--neon-cyan))] to-transparent opacity-50" />
      </div>
    </div>
  )
}
