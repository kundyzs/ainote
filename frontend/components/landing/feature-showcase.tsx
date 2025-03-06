"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Sparkles, Zap, FileText, Download, Clock, Laptop, Video, Lightbulb } from "lucide-react"

export default function FeatureShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const features = [
    {
      icon: <Laptop className="h-6 w-6 text-blue-400" />,
      title: "Slide Detection",
      description: "Automatically detects and captures key points from lecture slides as you view them.",
    },
    {
      icon: <Video className="h-6 w-6 text-purple-400" />,
      title: "Video Transcription",
      description: "Transcribes and summarizes video lectures in real-time as you watch them.",
    },
    {
      icon: <Brain className="h-6 w-6 text-pink-400" />,
      title: "AI Summarization",
      description: "Uses advanced AI to identify and extract the most important concepts and information.",
    },
    {
      icon: <Clock className="h-6 w-6 text-green-400" />,
      title: "Real-time Notes",
      description: "Creates notes instantly as you consume content, no manual input required.",
    },
    {
      icon: <FileText className="h-6 w-6 text-yellow-400" />,
      title: "Smart Organization",
      description: "Automatically organizes notes by topic, source, and relevance for easy reference.",
    },
    {
      icon: <Download className="h-6 w-6 text-red-400" />,
      title: "Export Options",
      description: "Export your notes in multiple formats including PDF, TXT, and markdown.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-orange-400" />,
      title: "Knowledge Connections",
      description: "Identifies relationships between concepts across different lectures and materials.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-400" />,
      title: "Distraction-Free",
      description: "Focus on understanding while AI handles the note-taking process for you.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,100,0.1),transparent_70%)]" />

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
              Powerful Features
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything You Need for <span className="text-primary">Effortless Note-Taking</span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our AI-powered platform handles all aspects of note-taking so you can focus on learning and understanding.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

