"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Zap, Star, Quote } from "lucide-react"

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      quote:
        "AI Note Taker has completely transformed how I study. I can focus on understanding the lecture instead of frantically writing notes.",
      author: "Sarah J.",
      role: "Computer Science Student",
      avatar: "/placeholder.svg?height=100&width=100",
      stars: 5,
    },
    {
      quote:
        "As someone with ADHD, taking notes during lectures was always challenging. This app has been a game-changer for my academic performance.",
      author: "Michael T.",
      role: "Medical Student",
      avatar: "/placeholder.svg?height=100&width=100",
      stars: 5,
    },
    {
      quote:
        "The AI summarization is incredibly accurate. It captures all the key points I would have written down, but in a more organized format.",
      author: "Priya K.",
      role: "Engineering Student",
      avatar: "/placeholder.svg?height=100&width=100",
      stars: 4,
    },
    {
      quote:
        "I was skeptical at first, but after using it for a semester, my grades have improved significantly. I can review concepts more efficiently.",
      author: "David L.",
      role: "Business Major",
      avatar: "/placeholder.svg?height=100&width=100",
      stars: 5,
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-950/20 to-black" id="testimonials">
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
              Student Success
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What <span className="text-primary">Students</span> Are Saying
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of students who have transformed their learning experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 relative"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <Quote className="h-5 w-5 text-primary" />
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
                  />
                ))}
              </div>

              <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-white/10">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white">{testimonial.author}</h4>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

