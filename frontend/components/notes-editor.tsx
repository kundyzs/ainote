"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Save, BookOpen, Video } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Note } from "@/types"
import { motion } from "framer-motion"
import { saveNote } from "@/notes" // Import the saveNote function

interface NotesEditorProps {
  note: Note | undefined
  onUpdate: (content: string) => void
}

export default function NotesEditor({ note, onUpdate }: NotesEditorProps) {
  const [content, setContent] = useState(note?.content || "")
  const [isSaving, setIsSaving] = useState(false)

  if (!note) {
    return null
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Call the backend to save the note
      const updatedNote = await saveNote({ ...note, content });
      onUpdate(updatedNote.content); // Update the parent component
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-lg shadow-[0_0_15px_rgba(125,125,255,0.1)]">
      <CardHeader>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            {note.type === "slide" ? (
              <BookOpen className="h-5 w-5 text-blue-400" />
            ) : (
              <Video className="h-5 w-5 text-purple-400" />
            )}
            <motion.div
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
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
          <div>
            <CardTitle className="text-white">{note.title}</CardTitle>
            <CardDescription className="text-white/60">
              Created {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
              {note.source && ` • Source: ${note.source}`}
            </CardDescription>
          </div>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] font-mono bg-black/60 border-white/10 text-white resize-none focus:border-primary/50 focus:ring-primary/20"
          />
        </motion.div>
      </CardContent>
      <CardFooter className="justify-between">
        <motion.p
          className="text-sm text-white/60"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Edit your notes or let AI continue to update them
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary/80 hover:bg-primary text-white relative overflow-hidden group"
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}