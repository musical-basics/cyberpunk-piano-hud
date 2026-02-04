"use client"

import { useState, useEffect, useRef } from 'react'

const COOL_DOWN_RATE = 0.98
const SHAKE_THRESHOLD = 15
const MAX_SHAKE_NPS = 35

export function useVibeEngine() {
    const [totalHits, setTotalHits] = useState(0)
    const [nps, setNps] = useState(0)
    const [isCritical, setIsCritical] = useState(false)
    // New state to pass logs back to the HUD
    const [statusLog, setStatusLog] = useState<string[]>([])

    const stateRef = useRef({
        timestamps: [] as number[],
        currentHeat: 0,
        total: 0
    })

    const hudRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initMIDI = async () => {
            // 1. Check browser support
            // @ts-ignore - navigator.requestMIDIAccess might be missing in types
            if (!navigator.requestMIDIAccess) {
                setStatusLog(prev => [...prev, "❌ Web MIDI not supported in this browser"])
                return
            }

            try {
                // 2. Request Access
                setStatusLog(prev => [...prev, "⚡ Requesting MIDI Access..."])
                const access = await navigator.requestMIDIAccess()

                setStatusLog(prev => [...prev, "✅ Access Granted!"])

                // 3. Scan for Inputs
                const inputs = Array.from(access.inputs.values())
                if (inputs.length === 0) {
                    setStatusLog(prev => [...prev, "⚠️ No MIDI devices found (Check cables?)"])
                } else {
                    inputs.forEach(input => {
                        setStatusLog(prev => [...prev, `🎹 Connected: ${input.name}`])
                        // Bind listener
                        input.onmidimessage = (msg) => {
                            if (!msg.data) return
                            const command = msg.data[0]
                            const velocity = msg.data[2]
                            // Note On (usually 144)
                            if (command >= 144 && command <= 159 && velocity > 0) {
                                handleNoteOn()
                            }
                        }
                    })
                }

                // Re-scan if device is plugged in later
                access.onstatechange = (e: any) => {
                    if (e.port.type === 'input' && e.port.state === 'connected') {
                        setStatusLog(prev => [...prev, `🔌 New Device: ${e.port.name}`])
                        // Re-bind listener to new device
                        e.port.onmidimessage = (msg: any) => {
                            if (!msg.data) return
                            const cmd = msg.data[0]
                            const vel = msg.data[2]
                            if (cmd >= 144 && cmd <= 159 && vel > 0) handleNoteOn()
                        }
                    }
                }

            } catch (err) {
                console.error("MIDI Init Failed", err)
                setStatusLog(prev => [...prev, "❌ MIDI Access Denied (Check permissions)"])
            }
        }

        const handleNoteOn = () => {
            const now = Date.now()
            stateRef.current.total++
            stateRef.current.timestamps.push(now)
            setTotalHits(stateRef.current.total)
        }

        initMIDI()

        // --- VIBE LOOP (Same as before) ---
        const loop = setInterval(() => {
            const now = Date.now()
            const s = stateRef.current
            s.timestamps = s.timestamps.filter(t => now - t <= 1000)
            const rawNps = s.timestamps.length

            if (rawNps > s.currentHeat) s.currentHeat = rawNps
            else s.currentHeat = s.currentHeat * COOL_DOWN_RATE

            setNps(parseFloat(s.currentHeat.toFixed(1)))
            setIsCritical(s.currentHeat > 25)

            if (hudRef.current && s.currentHeat > SHAKE_THRESHOLD) {
                let intensity = (s.currentHeat - SHAKE_THRESHOLD) / (MAX_SHAKE_NPS - SHAKE_THRESHOLD)
                if (intensity > 1) intensity = 1
                const x = (Math.random() - 0.5) * 15 * intensity
                const y = (Math.random() - 0.5) * 15 * intensity
                const scale = 1 + (intensity * 0.05)
                hudRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            } else if (hudRef.current) {
                hudRef.current.style.transform = `translate(0px, 0px) scale(1)`
            }
        }, 50)

        return () => clearInterval(loop)
    }, [])

    return { totalHits, nps, isCritical, hudRef, statusLog }
}
