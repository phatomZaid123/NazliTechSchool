"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Minimize2, Sparkles, MessageSquare, BookOpen, Code, FlaskConical, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const sampleResponses = [
  "I can help you understand complex concepts through interactive simulations!",
  "Would you like me to explain the physics behind projectile motion?",
  "Let me break down this coding problem step by step...",
  "Great question! Here's how machine learning actually works...",
  "I see you're curious about that! Let me guide you through it...",
]

const sampleQuestions = [
  { icon: Code, text: "Help with Python" },
  { icon: FlaskConical, text: "Explain physics" },
  { icon: Lightbulb, text: "AI concepts" },
  { icon: BookOpen, text: "Course info" },
]

const mascotExpressions = {
  idle: "animate-bounce",
  thinking: "animate-pulse",
  happy: "animate-none",
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hey there! I'm Nova, your AI learning buddy at Nazli Tech School. Ready to explore something amazing today?" }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mascotMood, setMascotMood] = useState<keyof typeof mascotExpressions>("idle")
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true)
    }, 2000)
    
    const openTimer = setTimeout(() => {
      setIsOpen(true)
      setShowWelcome(false)
    }, 5000)
    
    return () => {
      clearTimeout(welcomeTimer)
      clearTimeout(openTimer)
    }
  }, [])

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    setMessages(prev => [...prev, { role: 'user', content: inputValue }])
    setInputValue("")
    setIsTyping(true)
    setMascotMood("thinking")
    
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsTyping(false)
      setMascotMood("happy")
      
      setTimeout(() => setMascotMood("idle"), 2000)
    }, 1500)
  }

  return (
    <>
      {/* Floating mascot button with personality */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Welcome bubble */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className="absolute bottom-full right-0 mb-4 w-64 p-4 rounded-2xl rounded-br-md bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl"
                >
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-primary">Hi there!</span> Need help exploring our courses?
                  </p>
                  <div className="absolute bottom-0 right-4 translate-y-1/2 w-3 h-3 bg-card rotate-45 border-r border-b border-border/50" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mascot Avatar */}
            <motion.button
              onClick={() => {
                setIsOpen(true)
                setShowWelcome(false)
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-primary to-cyan-500 p-1 shadow-lg shadow-primary/40 group"
            >
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                {/* Nova Mascot Face */}
                <div className={`relative ${mascotExpressions[mascotMood]}`}>
                  {/* Face background */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center">
                    {/* Eyes */}
                    <div className="flex gap-2.5 mb-1">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-card"
                        animate={{ scaleY: mascotMood === "happy" ? 0.3 : 1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground ml-0.5 mt-0.5" />
                      </motion.div>
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-card"
                        animate={{ scaleY: mascotMood === "happy" ? 0.3 : 1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground ml-0.5 mt-0.5" />
                      </motion.div>
                    </div>
                  </div>
                  {/* Antenna */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-400 rounded-full">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Notification ping */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-accent-foreground" />
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '520px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col"
          >
            {/* Header with mascot */}
            <div className="relative bg-gradient-to-r from-purple-500/20 via-primary/20 to-cyan-500/20 p-4 border-b border-border/30">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/40"
                    animate={{
                      x: [Math.random() * 400, Math.random() * 400],
                      y: [Math.random() * 60, Math.random() * 60],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' }}
                  />
                ))}
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Mini mascot in header */}
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 p-0.5"
                    animate={{ rotate: mascotMood === "thinking" ? [0, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: mascotMood === "thinking" ? Infinity : 0 }}
                  >
                    <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center relative">
                        {/* Mini eyes */}
                        <div className="flex gap-1.5 mb-0.5">
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-card"
                            animate={{ scaleY: mascotMood === "happy" ? 0.3 : 1 }}
                          />
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-card"
                            animate={{ scaleY: mascotMood === "happy" ? 0.3 : 1 }}
                          />
                        </div>
                        {/* Mini antenna */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400 rounded-full">
                          <motion.div 
                            className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      Nova
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Your AI Learning Companion
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg hover:bg-secondary/50"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg hover:bg-secondary/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex-shrink-0 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-card" />
                            <div className="w-1 h-1 rounded-full bg-card" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-br-md'
                            : 'bg-secondary/50 text-foreground rounded-bl-md border border-border/30'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex-shrink-0 flex items-center justify-center animate-pulse">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 rounded-full bg-card" />
                          <div className="w-1 h-1 rounded-full bg-card" />
                        </div>
                      </div>
                      <div className="bg-secondary/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary"
                              animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick suggestions with icons */}
                <div className="px-4 pb-3">
                  <p className="text-xs text-muted-foreground mb-2">Quick topics:</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {sampleQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInputValue(q.text)}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border/30 hover:border-primary/30 transition-all whitespace-nowrap"
                      >
                        <q.icon className="w-3.5 h-3.5" />
                        {q.text}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 pt-0">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask Nova anything..."
                      className="flex-1 rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50 focus:ring-primary/20"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="icon"
                        onClick={handleSend}
                        className="rounded-lg"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
