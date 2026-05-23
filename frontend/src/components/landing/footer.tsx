"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import NazliLogo from "@/assets/NazliLogo.png";

const footerLinks = {
  product: [
    { label: "Courses", href: "#courses" },
    { label: "Simulations", href: "#simulation" },
    { label: "Apps", href: "#apps" },
    { label: "Videos", href: "#videos" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
    { label: "Digital Ecosystem", href: "#ecosystem" },
  ],
  resources: [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Articles", href: "#articles" },
    { label: "Testimonials", href: "#videos" },
    { label: "Udemy Courses", href: "https://www.udemy.com/" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-[#1a0f2e] overflow-hidden">
      {/* Background effects - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/8 via-accent/3 to-transparent rounded-full blur-2xl opacity-20"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-20">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pb-16 border-b border-border/30"
        ></motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
              ></motion.div>
              <img
                className=""
                src={NazliLogo}
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs font-light">
              Transforming education through interactive learning, AI guidance,
              and real-world projects.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>info@nazlitechschool.org</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
              >
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Rabat, Abuja, and remote</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Links columns */}
          {[
            { title: "Product", links: footerLinks.product },
            { title: "Company", links: footerLinks.company },
            { title: "Resources", links: footerLinks.resources },
            { title: "Legal", links: footerLinks.legal },
          ].map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/30"
        >
          <p className="text-sm text-muted-foreground font-light">
            © 2026 Nazli Tech School. All rights reserved.
          </p>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-card/80 to-background/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
