"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Instagram, Linkedin, Youtube, Facebook, Share2, X } from "lucide-react"

const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/nazlitechschool",
    color: "hover:bg-sky-500 hover:border-sky-500",
    hoverGlow: "group-hover:shadow-sky-500/50"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/nazlitechschool",
    color: "hover:bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-orange-500 hover:border-pink-500",
    hoverGlow: "group-hover:shadow-pink-500/50"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/nazlitechschool",
    color: "hover:bg-blue-600 hover:border-blue-600",
    hoverGlow: "group-hover:shadow-blue-600/50"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/nazlitechschool",
    color: "hover:bg-red-500 hover:border-red-500",
    hoverGlow: "group-hover:shadow-red-500/50"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/nazlitechschool",
    color: "hover:bg-blue-500 hover:border-blue-500",
    hoverGlow: "group-hover:shadow-blue-500/50"
  },
]

export function SocialSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="flex flex-col items-start">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ml-4 mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30"
        >
          {isExpanded ? <X className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
        </motion.button>

        {/* Social Links */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-2 ml-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  className={`group w-10 h-10 rounded-xl bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center transition-all duration-300 ${social.color} shadow-lg ${social.hoverGlow}`}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed indicator */}
        {!isExpanded && (
          <div className="ml-4 flex flex-col gap-1">
            {socialLinks.slice(0, 3).map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="w-10 h-1 rounded-full bg-border"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
