import { useState } from "react";
import { Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ rating, comment });
    setIsOpen(false);
    setRating(0);
    setComment("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-3 bg-[#4A314D] text-[#E5B95D] py-5 px-2 rounded-l-xl border border-r-0 border-[#E5B95D]/60 hover:bg-[#5C3D60] transition-colors shadow-[0_0_15px_rgba(229,185,93,0.2)]"
      >
        <span
          className="text-sm font-medium tracking-widest"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Feedback
        </span>
        <Star className="w-5 h-5 fill-current" />
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-gradient-to-br from-[#A58252]/90 to-[#4D3654]/90 backdrop-blur-md border border-[#E5B95D]/40 rounded-3xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6 mt-2">
                <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">
                  Rate Us
                </h2>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-12 h-12 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-[#F5B324] text-[#F5B324]"
                            : "fill-transparent text-[#F5B324]/40"
                        }`}
                        style={{ filter: star <= (hoveredRating || rating) ? "drop-shadow(0 0 8px rgba(245,179,36,0.6))" : "none" }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Comment Section */}
              <AnimatePresence>
                {rating > 0 && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 pt-2">
                      <div>
                        <label className="block text-white mb-2 text-lg drop-shadow-md">
                          Your Comments
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Great website!"
                          className="w-full bg-white/10 backdrop-blur-sm border border-[#E5B95D] rounded-xl p-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#E5B95D]/50 transition-all resize-none h-28"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#593C68] to-[#997441] hover:from-[#6B497D] hover:to-[#B3874B] text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                      >
                        Submit
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
