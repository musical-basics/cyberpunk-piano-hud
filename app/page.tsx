"use client"

import { useState, useEffect, useCallback } from "react"
import { PianoHUD } from "@/components/hud/piano-hud"

export default function HUDDemo() {
  const [totalHits, setTotalHits] = useState(1247893)
  const [nps, setNps] = useState(8.5)
  const [isCritical, setIsCritical] = useState(false)
  const [messages, setMessages] = useState([
    "System initialized...",
    "Audio driver loaded",
    "MIDI input detected",
    "Stream connected"
  ])
  const [currentSubtitle, setCurrentSubtitle] = useState("Welcome to the stream! Let's make some music together.")

  // Simulate changing values
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increment hits
      setTotalHits(prev => prev + Math.floor(Math.random() * 5))
      
      // Vary NPS with some randomness
      setNps(prev => {
        const change = (Math.random() - 0.5) * 4
        const newNps = Math.max(0, Math.min(35, prev + change))
        
        // Auto-trigger critical when NPS goes above 27
        if (newNps >= 27) {
          setIsCritical(true)
        } else if (newNps < 20) {
          setIsCritical(false)
        }
        
        return newNps
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Cycle through demo subtitles
  useEffect(() => {
    const subtitles = [
      "Welcome to the stream! Let's make some music together.",
      "That was an incredible run! 32 notes per second!",
      "Request coming up: Flight of the Bumblebee",
      "Thanks for the sub! Appreciate the support!",
      "This next piece is from Final Fantasy VII",
      "ENGINE HEAT RISING... Hands are on fire!",
    ]
    
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % subtitles.length
      setCurrentSubtitle(subtitles[index])
      setMessages(prev => [...prev.slice(-5), subtitles[index]])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Keyboard controls for demo
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch(e.key.toLowerCase()) {
      case 'c':
        // Toggle critical mode
        setIsCritical(prev => !prev)
        break
      case 'h':
        // Spike the heat
        setNps(28)
        break
      case 'r':
        // Reset
        setNps(8)
        setIsCritical(false)
        break
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Transparent background - this would be your stream/game capture */}
      <div className="absolute inset-0 bg-[#050510]/90">
        {/* Demo background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* The HUD Overlay */}
      <PianoHUD 
        totalHits={totalHits}
        nps={nps}
        maxNps={30}
        messages={messages}
        currentSubtitle={currentSubtitle}
        isCritical={isCritical}
      />


    </main>
  )
}
