import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  PhoneCall,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import questionAudio from "@/assets/questionaudio.mp3";
import SocialHub from "./social-media-section";
import ProfessionalWoman from "@/assets/ProfessionalWoman.png";
import Book from "@/assets/Book.png";

const contactEmail = "info@nazlitechschool.org";
// Web3Forms public access key — forwards to contactEmail
// First submission triggers a one-time verification email to contactEmail; click confirm once.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

export function QuestionsSection() {
  const sectionRef = useSectionAudio({
    audioSrc: questionAudio,
    sectionId: "contact",
  });

  type Status = "idle" | "sending" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Nazli Tech School inquiry");
    const message = String(data.get("message") || "");
    const updates = data.get("updates") ? "Yes" : "No";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Nazli Tech] ${subject}`,
          from_name: name,
          email: email, // reply-to
          to_email: contactEmail,
          message: `Name: ${name}\nEmail: ${email}\nWants updates: ${updates}\n\n${message}`,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus("success");
        formEl.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="relative py-24 overflow-x-hidden scroll-mt-28"
    >
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-nazli-golden/10 blur-[120px]" />
      <div className="section-glass-wrap container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Info & Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Info Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-nazli-purple/25 hover:border-nazli-purple/40 bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] backdrop-blur-xs p-8 transition-all duration-250 shadow-lg shadow-nazli-purple/5 hover:shadow-nazli-purple/10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nazli-golden/40 bg-nazli-golden/10 text-sm font-semibold text-nazli-golden">
                <MessageCircle className="w-4 h-4 text-nazli-golden" />
                We Love Questions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-5">
                Ask us anything about courses, pricing, or partnerships
              </h2>
              <p className="text-white/70 mt-3 leading-[1.65]">
                Our team will reply quickly with the guidance you need to choose
                the best learning path.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                {[
                  "Course matching",
                  "Pricing guidance",
                  "Partnership inquiries",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-nazli-purple/35 bg-nazli-purple/12 px-3 py-1 font-semibold text-nazli-golden"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-nazli-gray">
                  <Mail className="w-4 h-4 text-nazli-golden" />
                  {contactEmail}
                </div>
                <div className="flex items-center gap-3 text-nazli-gray">
                  <PhoneCall className="w-4 h-4 text-nazli-golden" />
                  +1 (555) 123-4567
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Book Form with Woman */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex items-end justify-center"
          >
            {/* Main container for the book-form composition */}
            <div className="relative w-full max-w-[440px]">
              {/* "Ask Nazha" Title - Above the book */}
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-4xl md:text-5
                xl font-bold mb-0 relative z-30"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  background:
                    "linear-gradient(135deg, #dbac34 0%, #f5d98a 40%, #dbac34 60%, #c49a2e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 8px rgba(219, 172, 52, 0.4))",
                }}
              >
                Ask Nazli
              </motion.h2>

              {/* Woman - positioned behind the book, visible from waist up */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[150px] md:w-[180px] pointer-events-none">
                <img
                  src={ProfessionalWoman}
                  alt="Nazha - Professional Advisor"
                  className="w-full h-auto object-contain drop-shadow-[0_4px_20px_rgba(100,50,150,0.5)]"
                />
              </div>

              {/* Book + Form composition */}
              <div className="relative z-20 mt-2">
                {/* Open Book as background */}
                <img
                  src={Book}
                  alt="Open Book"
                  className="w-full h-auto object-contain drop-shadow-[0_8px_32px_rgba(219,172,52,0.25)]"
                />

                {/* Form overlaid on book pages - split across left and right pages */}
                <form className="absolute inset-0" onSubmit={handleSubmit}>
                  {/* Left Page - Name, Email, Subject fields */}
                  {/* Book left page area: roughly left 7% to 47%, top 18% to 80% */}
                  <div
                    className="absolute flex flex-col justify-start gap-4 md:gap-6 pt-2 md:pt-4"
                    style={{
                      left: "14%",
                      top: "22%",
                      width: "35%",
                      bottom: "22%",
                    }}
                  >
                    {/* Name */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-nazli-purple/60 shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 md:w-4 md:h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                        className="w-full bg-transparent font-bold border-b border-nazli-purple/30 focus:border-nazli-purple/60 text-nazli-purple/90 placeholder:text-nazli-purple/60 placeholder:font-bold text-[11px] md:text-sm py-1 outline-none transition-colors"
                        style={{ fontFamily: "'Georgia', serif" }}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-nazli-purple/60 shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 md:w-4 md:h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="4" />
                          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                        </svg>
                      </span>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full bg-transparent font-bold border-b border-nazli-purple/30 focus:border-nazli-purple/60 text-nazli-purple/90 placeholder:text-nazli-purple/60 placeholder:font-bold text-[11px] md:text-sm py-1 outline-none transition-colors"
                        style={{ fontFamily: "'Georgia', serif" }}
                      />
                    </div>

                    {/* Subject */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-nazli-purple/60 shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 md:w-4 md:h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </span>
                      <input
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        required
                        className="w-full bg-transparent font-bold border-b border-nazli-purple/30 focus:border-nazli-purple/60 text-nazli-purple/90 placeholder:text-nazli-purple/60 placeholder:font-bold text-[11px] md:text-sm py-1 outline-none transition-colors"
                        style={{ fontFamily: "'Georgia', serif" }}
                      />
                    </div>
                  </div>

                  {/* Right Page - Message field */}
                  {/* Book right page area: roughly left 53% to 93%, top 18% to 80% */}
                  <div
                    className="absolute flex flex-col pt-2 md:pt-4"
                    style={{
                      left: "51%",
                      top: "22%",
                      width: "35%",
                      bottom: "22%",
                    }}
                  >
                    <div className="flex items-start gap-1.5 h-full">
                      <span className="text-nazli-purple/60 shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 md:w-4 md:h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                      </span>
                      <textarea
                        name="message"
                        placeholder="Message"
                        required
                        className="w-full h-full bg-transparent font-bold border-b border-nazli-purple/30 focus:border-nazli-purple/60 text-nazli-purple/90 placeholder:text-nazli-purple/60 placeholder:font-bold text-[11px] md:text-sm py-1 outline-none transition-colors resize-none"
                        style={{ fontFamily: "'Georgia', serif" }}
                      />
                    </div>
                  </div>

                  {/* Send button - centered at the bottom of the book */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 flex justify-center"
                    style={{ bottom: "8%" }}
                  >
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="rounded-full px-5 md:px-8 py-1.5 md:py-2.5 text-[10px] md:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-nazli-purple/30 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1.5"
                      style={{
                        background:
                          status === "success"
                            ? "linear-gradient(135deg, #1a7a3a 0%, #22a04e 50%, #145c2c 100%)"
                            : status === "error"
                              ? "linear-gradient(135deg, #7a1a1a 0%, #a02222 50%, #5c1414 100%)"
                              : "linear-gradient(135deg, #5a2d6a 0%, #7b3f8d 50%, #4a1d5a 100%)",
                        border: "2px solid rgba(219, 172, 52, 0.5)",
                        boxShadow: "0 4px 16px rgba(90, 45, 106, 0.4)",
                      }}
                    >
                      {status === "sending" && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      {status === "success" && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {status === "error" && (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {status === "idle" && "Send Message"}
                      {status === "sending" && "Sending…"}
                      {status === "success" && "Message Sent!"}
                      {status === "error" && "Failed — Retry"}
                    </button>
                  </div>
                </form>

                {/* "We reply within 24 hours" gold badge */}
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -right-4 md:bottom-0 md:-right-6 z-30 w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-center"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #f5d98a 0%, #dbac34 40%, #c49a2e 80%, #a07d24 100%)",
                    boxShadow:
                      "0 4px 20px rgba(219, 172, 52, 0.5), inset 0 -2px 6px rgba(160, 125, 36, 0.4), inset 0 2px 4px rgba(245, 217, 138, 0.6)",
                    border: "2px solid rgba(245, 217, 138, 0.7)",
                  }}
                >
                  <span
                    className="text-[7px] md:text-[10px] font-bold leading-tight text-nazli-purple"
                    style={{ textShadow: "0 1px 1px rgba(255,255,255,0.3)" }}
                  >
                    We reply
                    <br />
                    within
                    <br />
                    24 hours.
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <SocialHub />
      </div>
    </section>
  );
}
