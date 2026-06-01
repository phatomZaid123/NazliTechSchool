import { motion } from "framer-motion";
import { Mail, MessageCircle, PhoneCall } from "lucide-react";
import type { FormEvent } from "react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import questionAudio from "@/assets/questionaudio.mp3";
import SocialHub from "./social-media-section";

const contactEmail = "info@nazlitechschool.org";

export function QuestionsSection() {
  const sectionRef = useSectionAudio({
    audioSrc: questionAudio,
    sectionId: "contact",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Nazli Tech School inquiry");
    const message = String(data.get("message") || "");
    const updates = data.get("updates") ? "Yes" : "No";
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nUpdates: ${updates}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="relative py-24 overflow-x-hidden scroll-mt-28"
    >
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-nazli-golden/10 blur-[120px]" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-nazli-purple/25 hover:border-nazli-purple/40 bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-xl p-8 transition-all duration-250 shadow-lg shadow-nazli-purple/5 hover:shadow-nazli-purple/10"
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-nazli-golden/35 hover:border-nazli-golden/50 bg-nazli-purple/[0.4] hover:bg-nazli-purple/[0.6] p-8 transition-all duration-250 shadow-lg shadow-nazli-golden/10 hover:shadow-nazli-golden/15"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full rounded-lg border border-nazli-golden/35 bg-background/50 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-nazli-golden/80 focus:outline-none"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border border-nazli-golden/35 bg-background/50 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-nazli-golden/80 focus:outline-none"
                />
              </div>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                required
                className="w-full rounded-lg border border-nazli-golden/35 bg-background/50 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-nazli-golden/80 focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                className="w-full min-h-[8.75rem] rounded-lg border border-nazli-golden/35 bg-background/50 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-nazli-golden/80 focus:outline-none"
              />

              <label className="flex items-center gap-2 text-sm text-muted-foreground text-nazli-white">
                <input
                  name="updates"
                  type="checkbox"
                  className="accent-nazli-golden"
                />
                Sign up for our email list for updates and promotions.
              </label>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="submit"
                  className="rounded-lg px-6 py-2 bg-nazli-purple text-white font-semibold hover:bg-nazli-purple/90 transition-colors"
                >
                  Send Message
                </button>
                <span className="text-xs text-nazli-golden/90 font-medium">
                  We reply within 24 hours.
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <SocialHub />
    </section>
  );
}
