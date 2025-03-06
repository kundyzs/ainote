"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Laptop, MonitorPlay, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface CaptureSetupProps {
  onSetupComplete: () => void
}

export default function CaptureSetup({ onSetupComplete }: CaptureSetupProps) {
  const [selectedTab, setSelectedTab] = useState("slides")
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const requestScreenCapture = async () => {
    try {
      setIsLoading(true)
      // In a real app, we would actually request screen capture permissions here
      // This is a simulation for the prototype

      // Simulate successful permission
      setTimeout(() => {
        setPermissionGranted(true)
        setTimeout(() => {
          onSetupComplete()
        }, 1500)
      }, 1000)
    } catch (error) {
      console.error("Error requesting screen capture:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="w-full max-w-md"
      >
        <Card className="bg-black/40 border-white/10 backdrop-blur-lg shadow-[0_0_15px_rgba(125,125,255,0.2)]">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Setup AI Note Taker
            </CardTitle>
            <CardDescription className="text-white/70">
              Allow screen capture to automatically create notes from your lecture materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="slides" onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/50">
                <TabsTrigger
                  value="slides"
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Lecture Slides
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Video Lectures
                </TabsTrigger>
              </TabsList>
              <TabsContent value="slides" className="mt-4">
                <motion.div
                  className="flex flex-col items-center py-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <Laptop className="h-24 w-24 text-primary mb-4" />
                    <motion.div
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-white">Capture Slides</h3>
                  <p className="text-center text-white/70 mt-2">
                    AI will detect and summarize key points from your lecture slides as you view them.
                  </p>
                </motion.div>
              </TabsContent>
              <TabsContent value="videos" className="mt-4">
                <motion.div
                  className="flex flex-col items-center py-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <MonitorPlay className="h-24 w-24 text-primary mb-4" />
                    <motion.div
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-white">Video Lectures</h3>
                  <p className="text-center text-white/70 mt-2">
                    AI will listen to and transcribe video lectures, then create smart notes from the content.
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full relative overflow-hidden group"
              size="lg"
              onClick={requestScreenCapture}
              disabled={permissionGranted || isLoading}
            >
              {permissionGranted ? (
                "Permission Granted..."
              ) : isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  Grant Screen Capture Permission
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

