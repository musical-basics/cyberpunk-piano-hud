"use client"

import { useState, useEffect, useRef } from 'react'

const COOL_DOWN_RATE = 0.98  // Higher = Slower cooldown (0.0 - 1.0)
const SHAKE_THRESHOLD = 15   // NPS needed to start shaking
const MAX_SHAKE_NPS = 35     // NPS where shake is maximum

export function useVibeEngine() {
    const [totalHits, setTotalHits] = useState(0)
    const [nps, setNps] = useState(0)
    const [isCritical, setIsCritical] = useState(false)

    // Refs for logic loop to avoid re-renders
    const stateRef = useRef({
        timestamps: [] as number[],
        currentHeat: 0,
        total: 0
    })

    // Ref to the DOM element we want to shake
    const hudRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // 1. MIDI SETUP
        const initMIDI = async () => {
            try {
                const access = await navigator.requestMIDIAccess()

                // Listen to all inputs
                access.inputs.forEach((input) => {
                    input.onmidimessage = (msg) => {
                        if (!msg.data) return
                        const command = msg.data[0]
                        const velocity = msg.data[2]
                        // Note On (usually 144) with velocity > 0
                        if (command >= 144 && command <= 159 && velocity > 0) {
                            handleNoteOn()
                        }
                    }
                })
            } catch (err) {
                console.error("MIDI Init Failed", err)
            }
        }

        const handleNoteOn = () => {
            const now = Date.now()
            stateRef.current.total++
            stateRef.current.timestamps.push(now)
            // Force update total hits for UI
            setTotalHits(stateRef.current.total)
        }

        initMIDI()

        // 2. THE VIBE LOOP (Runs 60fps for smooth visuals)
        const loop = setInterval(() => {
            const now = Date.now()
            const s = stateRef.current

            // Filter notes from last 1 second
            s.timestamps = s.timestamps.filter(t => now - t <= 1000)
            const rawNps = s.timestamps.length

            // Heat Logic: Heat rises instantly, cools slowly
            if (rawNps > s.currentHeat) {
                s.currentHeat = rawNps
            } else {
                s.currentHeat = s.currentHeat * COOL_DOWN_RATE
            }

            // Update React State for the gauge
            setNps(parseFloat(s.currentHeat.toFixed(1)))

            // Critical Logic
            const critical = s.currentHeat > 25
            setIsCritical(critical)

            // 3. SHAKE PHYSICS (Direct DOM manipulation)
            if (hudRef.current && s.currentHeat > SHAKE_THRESHOLD) {
                // Calculate intensity (0.0 to 1.0)
                let intensity = (s.currentHeat - SHAKE_THRESHOLD) / (MAX_SHAKE_NPS - SHAKE_THRESHOLD)
                if (intensity > 1) intensity = 1

                // Random jitter
                const x = (Math.random() - 0.5) * 15 * intensity
                const y = (Math.random() - 0.5) * 15 * intensity
                const scale = 1 + (intensity * 0.05) // Grow 5%

                hudRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            } else if (hudRef.current) {
                // Reset
                hudRef.current.style.transform = `translate(0px, 0px) scale(1)`
            }

        }, 50)

        return () => clearInterval(loop)
    }, [])

    return { totalHits, nps, isCritical, hudRef }
}
