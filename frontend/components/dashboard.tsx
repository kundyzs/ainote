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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("current")
  const [isCapturing, setIsCapturing] = useState(true)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])

  // Fetch notes from the backend
  useEffect(() => {
    fetchNotes();
  }, []);

  // Simulate AI generating notes over time
  useEffect(() => {
    if (isCapturing) {
      const interval = setInterval(async () => {
        const randomType = Math.random() > 0.5 ? "slide" : "video";
        const newNote: Note = {
          id: Date.now().toString(),
          title:
            randomType === "slide"
              ? `Lecture Slide ${Math.floor(Math.random() * 20) + 1}`
              : `Video Lecture ${Math.floor(Math.random() * 10) + 1}`,
          content: generateSampleContent(randomType),
          timestamp: new Date(),
          type: randomType,
          source: randomType === "slide" ? "PowerPoint Presentation" : "Recorded Lecture",
        };

        await saveNote(newNote);
        setNotes((prev) => [newNote, ...prev]);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isCapturing]);

  // WebSocket for real-time updates
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const newNote = JSON.parse(event.data);
      setNotes((prev) => [newNote, ...prev]);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Save a note to the backend
  const saveNote = async (note: Note) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error("Failed to save note");
      }
      return await response.json();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Helper to generate sample content
  const generateSampleContent = (type: string): string => {
    if (type === "slide") {
      const slideContents = [
        "• Key feature of reinforcement learning is the reward signal\n• Unlike supervised learning, no labeled examples are provided\n• Agent learns through trial and error interactions with environment\n• Policy optimization is a core concept in modern approaches",
        "• Neural networks can approximate complex functions\n• Deep learning enables end-to-end learning without feature engineering\n• Convolutional layers are effective for spatial data\n• Recurrent architectures handle sequential information",
        "• Data preprocessing is critical for model performance\n• Feature scaling improves convergence rates\n• Categorical variables require encoding strategies\n• Missing values should be handled appropriately",
      ]
      return slideContents[Math.floor(Math.random() * slideContents.length)]
    } else {
      const videoContents = [
        "The lecturer explained how transformer models work by using self-attention mechanisms to weigh different parts of the input sequence. This allows the model to focus on relevant information regardless of position in the sequence, which was a breakthrough compared to RNNs and LSTMs.",
        "Today's session covered gradient descent optimization algorithms. The professor described how Adam combines the benefits of AdaGrad and RMSProp, adaptively adjusting learning rates for each parameter while maintaining momentum.",
        "The key takeaway from this part of the lecture was how ensemble methods reduce variance by combining multiple models. Random Forests specifically use bagging and feature randomness to create diverse decision trees.",
      ]
      return videoContents[Math.floor(Math.random() * videoContents.length)]
    }
  }

  // Handle export
  const handleExport = async (format: "pdf" | "txt") => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/export?format=${format}`);
      if (!response.ok) {
        throw new Error("Failed to export notes");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `notes.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting notes:", error);
    }
  };

  const toggleCapture = () => {
    setIsCapturing(!isCapturing)
  }

  const handleNoteSelect = (noteId: string) => {
    setActiveNoteId(noteId)
    setActiveTab("editor")
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteId)
  }

  const updateNote = async (updatedContent: string) => {
    const updatedNote = { ...getActiveNote(), content: updatedContent };
    await saveNote(updatedNote); // Save the updated note to the backend
    setNotes(notes.map((note) => (note.id === activeNoteId ? updatedNote : note)));
};

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
                  onClick={toggleCapture}
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
                        <ScreenCapture isActive={isCapturing} />
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

