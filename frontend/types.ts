export interface Note {
    id: string
    title: string
    content: string
    timestamp: Date
    type: "slide" | "video"
    source?: string
  }
  
  