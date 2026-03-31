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

const footerLinks = {
  product: [
    { label: "Courses", href: "#" },
    { label: "Simulations", href: "#" },
    { label: "AI Assistant", href: "#" },
    { label: "Community", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "API", href: "#" },
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
    <footer className="relative border-t border-border/30 bg-gradient-to-b from-card/30 to-background/80 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-20">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pb-16 border-b border-border/30"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-foreground mb-3">
              Ready to transform your learning?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our community of learners and start your journey today.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card/80 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

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
            <a href="/" className="flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
              >
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="text-2xl font-bold text-foreground">
                Nazli<span className="text-primary">Tech</span>
              </span>
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
                <span>hello@nazlitech.edu</span>
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
                <span>San Francisco, CA</span>
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
            © 2024 Nazli Tech School. All rights reserved.
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
