"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create a gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(10, 10, 30, 1)")
      gradient.addColorStop(1, "rgba(30, 10, 60, 1)")
      return gradient
    }

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      density: number
      distance: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = Math.random() * 2 + 0.5
        this.speedX = 0
        this.speedY = 0
        this.color = this.getRandomColor()
        this.density = Math.random() * 30 + 1
        this.distance = 0
      }

      getRandomColor() {
        const colors = [
          "rgba(64, 93, 230, 0.8)",
          "rgba(88, 85, 214, 0.8)",
          "rgba(113, 42, 255, 0.8)",
          "rgba(32, 156, 238, 0.8)",
          "rgba(180, 60, 255, 0.8)",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = this.color
        ctx!.fill()
      }

      update(mouseX: number, mouseY: number) {
        // Calculate distance between particle and mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

        const forceDirectionX = dx / this.distance
        const forceDirectionY = dy / this.distance

        // Max distance, past which the force is 0
        const maxDistance = 100
        let force = (maxDistance - this.distance) / maxDistance

        // If distance is less than maxDistance, apply force
        if (force < 0) force = 0

        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        if (this.distance < maxDistance) {
          this.x -= directionX
          this.y -= directionY
        } else {
          // If particle is away from its original position
          if (this.x !== this.originalX) {
            const dx = this.x - this.originalX
            this.x -= dx / 20
          }
          if (this.y !== this.originalY) {
            const dy = this.y - this.originalY
            this.y -= dy / 20
          }
        }
      }
    }

    // Create particles
    let particles: Particle[] = []
    const initParticles = () => {
      particles = []
      const numberOfParticles = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000))

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    initParticles()
    window.addEventListener("resize", initParticles)

    // Mouse position
    let mouseX = 0
    let mouseY = 0

    window.addEventListener("mousemove", (e) => {
      mouseX = e.x
      mouseY = e.y
    })

    // Animation loop
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      ctx!.fillStyle = createGradient()
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY)
        particles[i].draw()
      }

      // Draw connections
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1200})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(particles[a].x, particles[a].y)
            ctx!.lineTo(particles[b].x, particles[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", initParticles)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 z-1" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px] z-0"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-500/20 blur-[100px] z-0"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}

