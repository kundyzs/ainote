"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Zap, Monitor, Brain, FileText, Download } from "lucide-react"

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const steps = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-400" />,
      title: "Grant Screen Access",
      description: "Allow the app to view your screen so it can analyze lecture slides and videos.",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "AI Processes Content",
      description: "Our advanced AI analyzes the content in real-time, identifying key concepts and information.",
    },
    {
      icon: <FileText className="h-8 w-8 text-pink-400" />,
      title: "Notes Are Generated",
      description: "Comprehensive, well-structured notes are automatically created and saved to your account.",
    },
    {
      icon: <Download className="h-8 w-8 text-green-400" />,
      title: "Review & Export",
      description: "Review your notes, make edits if needed, and export them in your preferred format.",
    },
  ]

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,50,100,0.1),transparent_70%)]" />

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
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How <span className="text-primary">AI Note Taker</span> Works
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get started in minutes with our simple four-step process
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Progress line */}
          <div className="absolute left-[50%] md:left-16 top-0 bottom-0 w-0.5 bg-white/10">
            <motion.div className="absolute top-0 left-0 w-full bg-primary" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-24 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-6"
              >
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 md:pt-0 text-center md:text-left">
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center mb-4 mx-auto md:mx-0">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

