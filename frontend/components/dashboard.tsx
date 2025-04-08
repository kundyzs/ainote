"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileIcon as FilePdf, FileText, Sparkles } from "lucide-react"
import NoteItem from "@/components/note-item"
import ScreenCapture from "@/components/screen-capture"
import type { Note } from "@/types"
import NotesEditor from "@/components/notes-editor"
import { motion, AnimatePresence } from "framer-motion"

interface DashboardProps {
  notes: Note[] // Notes passed from the parent component
  onSaveNote: (note: Note) => void // Function to save/update a note
}

export default function Dashboard({ notes, onSaveNote }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("current")
  const [isCapturing, setIsCapturing] = useState(false) // Track screen capture state
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null) // Store the MediaStream

  // Handle export
  const handleExport = async (format: "pdf" | "txt") => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/export?format=${format}`)
      if (!response.ok) {
        throw new Error("Failed to export notes")
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `notes.${format}`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting notes:", error)
    }
  }

  // Handle screen capture start
  const handleStartCapture = async (stream: MediaStream) => {
    setIsCapturing(true)
    setMediaStream(stream) // Store the MediaStream for cleanup
  }

  // Handle screen capture stop
  const handleStopCapture = () => {
    setIsCapturing(false)
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop()) // Stop all tracks in the stream
      setMediaStream(null) // Clear the MediaStream
    }
  }

  const handleNoteSelect = (noteId: string) => {
    setActiveNoteId(noteId)
    setActiveTab("editor")
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteId)
  }

  const updateNote = async (updatedContent: string) => {
    const activeNote = getActiveNote()
    if (!activeNote) {
      throw new Error("Active note not found")
    }
    const updatedNote = { ...activeNote, content: updatedContent }
    await onSaveNote(updatedNote) // Use the onSaveNote prop to save the note
  }

  // Cleanup the MediaStream when the component unmounts
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [mediaStream])

  return (
    <motion.div
      className="flex flex-col space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <motion.div
          className="w-full md:w-2/3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <TabsList className="bg-black/50">
                <TabsTrigger
                  value="current"
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Current Session
                </TabsTrigger>
                <TabsTrigger
                  value="editor"
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  Note Editor
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button
                  variant={isCapturing ? "destructive" : "outline"}
                  size="sm"
                  onClick={isCapturing ? handleStopCapture : async () => {
                    try {
                      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                      handleStartCapture(stream);
                    } catch (error) {
                      console.error("Error starting screen capture:", error);
                    }
                  }}
                  className={isCapturing ? "" : "border-white/20 bg-black/50"}
                >
                  {isCapturing ? "Stop Capturing" : "Start Capturing"}
                </Button>
                <ExportButton format="pdf" onClick={() => handleExport("pdf")} />
                <ExportButton format="txt" onClick={() => handleExport("txt")} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "current" ? (
                <motion.div
                  key="current"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="current" forceMount>
                    <Card className="bg-black/40 border-white/10 backdrop-blur-lg shadow-[0_0_15px_rgba(125,125,255,0.1)]">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-primary" />
                          AI Screen Capture
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          AI is monitoring your screen and creating notes automatically
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScreenCapture
                          isActive={isCapturing}
                          onStartCapture={handleStartCapture}
                          onStopCapture={handleStopCapture}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              ) : (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="editor" forceMount>
                    {activeNoteId ? (
                      <NotesEditor note={getActiveNote()} onUpdate={updateNote} />
                    ) : (
                      <Card className="bg-black/40 border-white/10 backdrop-blur-lg shadow-[0_0_15px_rgba(125,125,255,0.1)]">
                        <CardContent className="p-6 text-center text-white/60">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="py-8"
                          >
                            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                            <p>Select a note from the list to edit</p>
                          </motion.div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* Right section - Notes list */}
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-black/40 border-white/10 backdrop-blur-lg shadow-[0_0_15px_rgba(125,125,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Generated Notes
              </CardTitle>
              <CardDescription className="text-white/70">
                {notes.length} notes created during this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {notes.length > 0 ? (
                    notes.map((note, index) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <NoteItem
                          note={note}
                          onClick={() => handleNoteSelect(note.id)}
                          isActive={note.id === activeNoteId}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center py-8 text-white/60"
                    >
                      <Sparkles className="h-10 w-10 mx-auto mb-3 text-primary/50" />
                      <p>No notes yet. AI will generate notes as you view lecture material.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ExportButton({ format, onClick }: { format: "pdf" | "txt"; onClick: () => void }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className="border-white/20 bg-black/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
      >
        {format === "pdf" ? <FilePdf className="h-4 w-4 mr-1" /> : <FileText className="h-4 w-4 mr-1" />}
        {format.toUpperCase()}
      </Button>
    </motion.div>
  )
}