"use client"

import React, { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface ScreenCaptureProps {
  isActive: boolean
}

export default function ScreenCapture({ isActive }: ScreenCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [processingStatus, setProcessingStatus] = useState<string | null>(null)

  const sendFrameToBackend = async (frame: Blob) => {
    const formData = new FormData();
    formData.append("file", frame);
  
    const response = await fetch("http://127.0.0.1:8000/api/process-frame", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to process frame");
    }
  
    return await response.json();
  };
  
  useEffect(() => {
    if (!isActive) return;
  
    const captureFrame = async () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
  
        // Draw the current video frame onto the canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Convert the canvas image to a Blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const result = await sendFrameToBackend(blob);
              console.log("Frame processed:", result);
            } catch (error) {
              console.error("Error processing frame:", error);
            }
          }
        }, "image/jpeg");
      }
    };
  
    const interval = setInterval(captureFrame, 5000); // Capture a frame every 5 seconds
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-full">
      {/* Screen preview placeholder */}
      <motion.div
        className="relative aspect-video bg-black/60 rounded-lg overflow-hidden border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(125,125,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"
            animate={{
              background: [
                "linear-gradient(to bottom right, rgba(30, 64, 175, 0.2), rgba(126, 34, 206, 0.2))",
                "linear-gradient(to bottom right, rgba(126, 34, 206, 0.2), rgba(30, 64, 175, 0.2))",
                "linear-gradient(to bottom right, rgba(30, 64, 175, 0.2), rgba(126, 34, 206, 0.2))",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isActive ? (
            <>
              <motion.div
                className="w-16 h-16 mb-4 relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
              </motion.div>
              <motion.p
                className="text-center font-medium mb-2 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                AI is actively monitoring your screen
              </motion.p>
              {processingStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="outline" className="bg-black/80 text-primary border-primary/30 animate-pulse">
                    {processingStatus}
                  </Badge>
                </motion.div>
              )}
            </>
          ) : (
            <motion.p
              className="text-center font-medium text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Screen capture is paused
            </motion.p>
          )}
        </div>

        {/* Hidden video and canvas elements that would be used in a real implementation */}
        <video ref={videoRef} className="hidden" autoPlay playsInline muted></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </motion.div>

      <div className="flex justify-between items-center mt-4">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={`rounded-full ${isActive ? "bg-primary/80" : "bg-white/10 text-white/60"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </motion.div>
        <motion.p
          className="text-sm text-white/60"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isActive
            ? "AI is analyzing your screen content and creating notes"
            : "Click 'Start Capturing' to enable AI note taking"}
        </motion.p>
      </div>
    </div>
  )
}

