"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-purple-950/20"
      id="demo"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex justify-center"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Zap className="mr-1 h-3.5 w-3.5" />
              See It In Action
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Watch How <span className="text-primary">AI Note Taker</span> Works
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how our AI-powered platform automatically captures and summarizes lecture content in real-time.
          </motion.p>
        </div>

        <motion.div
          style={{ scale, opacity }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
        >
          <div className="aspect-video bg-black/60 relative group">
            {/* This would be a real video in production */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="Demo Video Thumbnail"
                className="w-full h-full object-cover opacity-60"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="icon"
                  className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300"
                >
                  <Play className="h-10 w-10 ml-1" />
                </Button>
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-2xl font-bold text-white mb-2">AI Note Taker Demo</h3>
                <p className="text-white/70">
                  See how the app captures lecture slides and creates intelligent notes automatically
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 text-white/70"
          >
            <span className="font-medium text-white">4.9/5</span> average rating from students
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 text-white/70"
          >
            <span className="font-medium text-white">10,000+</span> active users
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 text-white/70"
          >
            <span className="font-medium text-white">500,000+</span> notes generated
          </motion.div>
        </div>
      </div>
    </section>
  )
}

