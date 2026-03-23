"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  connections: number[]
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const frameRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  const colors = [
    "139, 92, 246",   // Purple
    "6, 182, 212",    // Cyan
    "59, 130, 246",   // Blue
  ]

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(90, Math.floor((width * height) / 25000))
    particlesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.2,
        connections: [],
      })
    }
  }, [])

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    const particles = particlesRef.current
    const mouse = mouseRef.current
    frameRef.current += 1
    const drawConnections = frameRef.current % 2 === 0

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 140) {
        const force = (140 - dist) / 140
        p.vx -= (dx / dist) * force * 0.02
        p.vy -= (dy / dist) * force * 0.02
      }

      p.x += p.vx
      p.y += p.vy

      p.vx *= 0.985
      p.vy *= 0.985

      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      p.x = Math.max(0, Math.min(width, p.x))
      p.y = Math.max(0, Math.min(height, p.y))

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
      ctx.shadowBlur = 12
      ctx.shadowColor = `rgba(${p.color}, 0.4)`
      ctx.fill()
      ctx.shadowBlur = 0

      if (!drawConnections) continue

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx2 = p.x - p2.x
        const dy2 = p.y - p2.y
        const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2)

        if (distance < 100) {
          const opacity = (1 - distance / 100) * 0.12
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(${p.color}, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    if (!prefersReducedMotion && !document.hidden) {
      animationRef.current = requestAnimationFrame(renderFrame)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    renderFrame()

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current)
      } else if (!prefersReducedMotion) {
        renderFrame()
      }
    }

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("visibilitychange", handleVisibility)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initParticles, renderFrame, prefersReducedMotion])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "transparent" }}
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
          }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)",
          }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </>
  )
}
