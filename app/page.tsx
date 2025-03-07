"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/landing/hero-section"
import FeatureShowcase from "@/components/landing/feature-showcase"
import DemoSection from "@/components/landing/demo-section"
import HowItWorks from "@/components/landing/how-it-works"
import Testimonials from "@/components/landing/testimonials"
import CallToAction from "@/components/landing/call-to-action"
import Footer from "@/components/landing/footer"
import Dashboard from "@/components/dashboard"
import CaptureSetup from "@/components/capture-setup"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [isAppMode, setIsAppMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const startApp = () => {
    setIsAppMode(true)
  }

  if (!mounted) return null

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={topRef}>
        <Navbar isAppMode={isAppMode} onLogoClick={() => setIsAppMode(false)} />

        <AnimatePresence mode="wait">
          {isAppMode ? (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <main className="container mx-auto py-6 px-4 md:px-6">
                {!isSetupComplete ? <CaptureSetup onSetupComplete={() => setIsSetupComplete(true)} /> : <Dashboard />}
              </main>
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <main>
                <HeroSection onGetStarted={startApp} />
                <FeatureShowcase />
                <DemoSection />
                <HowItWorks />
                <Testimonials />
                <CallToAction onGetStarted={startApp} />
                <Footer />
              </main>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollTop && !isAppMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <Button
                size="icon"
                className="rounded-full bg-primary/80 hover:bg-primary shadow-lg shadow-primary/20"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

