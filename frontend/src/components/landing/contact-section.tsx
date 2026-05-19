"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen bg-gradient-to-b from-background to-background/50 pt-32 pb-20 px-6 overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase">Get In Touch</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
            Have questions about our courses, apps, or simulations? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Email Us</h4>
                  <p className="text-xl font-bold">info@nazlitech.org</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Call Us</h4>
                  <p className="text-xl font-bold">+212 5XX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Visit Us</h4>
                  <p className="text-xl font-bold">Rabat, Morocco</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare size={24} className="text-purple-500" /> WhatsApp Support
              </h3>
              <p className="text-white/60 mb-8">Quickest way to get your questions answered. Our team is available 24/7.</p>
              <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-purple-500 hover:text-white transition-all">
                Message on WhatsApp
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-colors text-white placeholder:text-white/30" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-colors text-white placeholder:text-white/30" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Subject</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-colors text-white placeholder:text-white/30" placeholder="Course Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-colors resize-none text-white placeholder:text-white/30" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
