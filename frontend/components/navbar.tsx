"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Menu, X, Brain, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface NavbarProps {
  isAppMode: boolean
  onLogoClick: () => void
}

export default function Navbar({ isAppMode, onLogoClick }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        scrolled ? "bg-black/70 border-b border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onLogoClick}
        >
          <div className="relative">
            <Brain className="h-7 w-7 text-primary" />
            <motion.div
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            AI Note Taker
          </span>
        </motion.div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop menu */}
        <motion.nav
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {!isAppMode && (
            <>
              <NavItem label="Features" onClick={() => scrollToSection("features")} delay={0.1} />
              <NavItem label="Demo" onClick={() => scrollToSection("demo")} delay={0.2} />
              <NavItem label="How It Works" onClick={() => scrollToSection("how-it-works")} delay={0.3} />
              <NavItem label="Testimonials" onClick={() => scrollToSection("testimonials")} delay={0.4} />
            </>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow:
                        theme === "dark"
                          ? [
                              "0 0 0 0 rgba(255, 255, 255, 0)",
                              "0 0 0 2px rgba(255, 255, 255, 0.1)",
                              "0 0 0 0 rgba(255, 255, 255, 0)",
                            ]
                          : [
                              "0 0 0 0 rgba(255, 255, 255, 0)",
                              "0 0 0 2px rgba(255, 255, 255, 0.2)",
                              "0 0 0 0 rgba(255, 255, 255, 0)",
                            ],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border-white/20">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </motion.nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-50 w-full bg-black/95 backdrop-blur-lg p-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4">
              {!isAppMode && (
                <>
                  <MobileNavItem
                    label="Features"
                    icon={<Sparkles className="h-4 w-4 mr-2" />}
                    onClick={() => scrollToSection("features")}
                  />
                  <MobileNavItem
                    label="Demo"
                    icon={<Sparkles className="h-4 w-4 mr-2" />}
                    onClick={() => scrollToSection("demo")}
                  />
                  <MobileNavItem
                    label="How It Works"
                    icon={<Sparkles className="h-4 w-4 mr-2" />}
                    onClick={() => scrollToSection("how-it-works")}
                  />
                  <MobileNavItem
                    label="Testimonials"
                    icon={<Sparkles className="h-4 w-4 mr-2" />}
                    onClick={() => scrollToSection("testimonials")}
                  />
                </>
              )}
              <div className="flex items-center pt-4 border-t border-white/10">
                <span className="mr-2 text-white/70">Theme:</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2 bg-black/50 border-white/20"
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/50 border-white/20"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

function NavItem({ label, onClick, delay = 0 }: { label: string; onClick: () => void; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Button variant="ghost" className="relative group" onClick={onClick}>
        <span>{label}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
      </Button>
    </motion.div>
  )
}

function MobileNavItem({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ x: 5 }}
    >
      <Button variant="ghost" className="justify-start w-full text-lg font-medium" onClick={onClick}>
        {icon}
        {label}
      </Button>
    </motion.div>
  )
}

