"use client"

import { useState, useEffect, useRef } from 'react'

export function useSpeech() {
  const [transcript, setTranscript] = useState("Waiting for voice...")
  const [logs, setLogs] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // @ts-ignore - Web Speech API types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      let finalStr = ''
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalStr += event.results[i][0].transcript
      }

      // Keep only last 15 words
      const words = finalStr.trim().split(/\s+/)
      const display = words.length > 15 
        ? "..." + words.slice(-15).join(" ") 
        : words.join(" ")
      
      if (display) setTranscript(display)
    }

    recognition.onend = () => {
      // Auto-restart logic
      try { recognition.start() } catch (e) {}
    }

    try { recognition.start() } catch (e) {}
    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop()
    }
  }, [])

  return { transcript, logs }
}
