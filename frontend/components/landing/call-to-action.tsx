"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface CallToActionProps {
  onGetStarted: () => void
}

export default function CallToAction({ onGetStarted }: CallToActionProps) {
  const benefits = [
    "Save hours of manual note-taking",
    "Improve comprehension and retention",
    "Create organized, searchable notes",
    "Focus on learning, not writing",
  ]

  return (
    <section className="py-24 relative overflow-hidden" id="get-started">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,100,0.2),transparent_70%)]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] z-0"
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
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] z-0"
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl shadow-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your <span className="text-primary">Learning Experience?</span>
              </h2>

              <p className="text-white/70 mb-8">
                Join thousands of students who are saving time and improving their grades with AI Note Taker.
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-white/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-medium group"
                onClick={onGetStarted}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg shadow-primary/10">
                <img src="/placeholder.svg?height=600&width=800" alt="AI Note Taker App" className="w-full h-auto" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="text-sm text-white/80">AI Active</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Currently capturing notes from "Introduction to Machine Learning - Lecture 3"
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -top-6 -right-6 bg-primary/80 backdrop-blur-sm text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg shadow-primary/20 border border-white/20"
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5, rotate: -5 }}
              >
                Start for free!
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

