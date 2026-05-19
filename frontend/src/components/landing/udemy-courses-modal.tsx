"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface UdemyCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UdemyCoursesModal({ isOpen, onClose }: UdemyCoursesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-[71] flex items-center justify-center px-4 "
          >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-600">  
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Content */}
              <div className="p-8 sm:p-12 text-center space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold bg-purple-600 bg-clip-text text-transparent">
                    Udemy Courses
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed">
                  Welcome! Check out our programming courses on the Udemy
                  platform.
                </p>

                {/* CTA Button */}
                <a
                  href="https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-purple-600  text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  VIEW COURSES
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
