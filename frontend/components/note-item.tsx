"use client"

import React, { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { BookOpen, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Note } from "@/types"
import { motion } from "framer-motion"
import { fetchNotes } from "@/notes" // Import the fetchNotes function

interface NoteItemProps {
  note: Note
  onClick: () => void
  isActive: boolean
}

export default function NoteItem({ note, onClick, isActive }: NoteItemProps) {
  return (
    <motion.div
      className={cn(
        "p-3 rounded-lg border cursor-pointer transition-all",
        isActive
          ? "border-primary/50 bg-primary/10 shadow-[0_0_10px_rgba(125,125,255,0.2)]"
          : "border-white/10 bg-black/40 hover:border-primary/30 hover:bg-primary/5",
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 relative">
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
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate text-white">{note.title}</h4>
          <p className="text-xs text-white/50 mb-1">
            {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
          </p>
          <p className="text-xs line-clamp-2 text-white/70">{note.content.split("\n")[0]}</p>
        </div>
      </div>
    </motion.div>
  )
}