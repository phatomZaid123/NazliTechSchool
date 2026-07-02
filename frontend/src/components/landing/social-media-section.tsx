"use client";

import { motion } from "framer-motion";
import { FacebookIcon } from "lucide-react";
import { memo } from "react";

// --- Custom Official Brand SVG Components ---
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const BloggerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M3.5 1.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V1.5zm7.5 3.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3zm1 2h1v5h-1v-5z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.223-.937 1.58-6.685 1.58-6.685s-.389-.779-.389-1.937c0-1.816.933-3.168 2.095-3.168 1.029 0 1.525.771 1.525 1.696 0 1.034-.658 2.578-.994 4.016-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.179 0 1.025.394 2.122.889 2.722.098.12.119.225.089.345-.098.416-.315 1.338-.356 1.524-.067.289-.219.349-.503.209-1.402-.658-2.278-2.734-2.278-4.411 0-3.585 2.605-6.88 7.516-6.88 3.95 0 7.015 2.811 7.015 6.575 0 3.92-2.467 7.085-5.892 7.085-1.148 0-2.227-.595-2.595-1.299l-.707 2.692c-.263.998-.969 2.24-1.44 3.001 1.085.315 2.23.484 3.419.484 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
  </svg>
);

const TPTIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3 7h-2V7h-2v2H9v2h2v3c0 1.657 1.343 3 3 3h2v-2h-2c-.551 0-1-.449-1-1v-3h3v-2z" />
  </svg>
);
const QuoraIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.5 17h-3v-2h3v2zm0-3h-3V7h3v7z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 127.14 96.36" fill="currentColor" className="w-8 h-8">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0A105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36a77.7,77.7,0,0,0,6.89-11.11A68.58,68.58,0,0,1,23.69,78.8a68.18,68.18,0,0,0,5.64-4.5c28.81,13.36,60.75,13.89,88.5,0a70.56,70.56,0,0,0,5.63,4.5A68.68,68.68,0,0,1,87.54,85.25a77.6,77.6,0,0,0,6.89,11.1A105.58,105.58,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60.55,31,53.88s5-11.75,11.45-11.75S54,47.16,53.89,53.88,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60.55,73.25,53.88s5-11.75,11.45-11.75S96.23,47.16,96.12,53.88,91.08,65.69,84.69,65.69Z" />
  </svg>
);

// --- Updated Platform Configuration ---
const SOCIAL_PLATFORMS = [
  {
    name: "YouTube",
    handle: "Nazli Tech School",
    url: "https://www.youtube.com/@nazlitechschool/",
    icon: YoutubeIcon,
    brandColor: "#FF0000",
  },

  {
    name: "Blogger",
    handle: "Nazli Tech",
    url: "https://nazlitechschool.blogspot.com/",
    icon: BloggerIcon,
    brandColor: "#FF6A3D",
  },
  {
    name: "LinkedIn",
    handle: "Nazli Tech School",
    url: "https://www.linkedin.com/company/nazli-tech-school/",
    icon: LinkedInIcon,
    brandColor: "#0A66C2",
  },
  {
    name: "Facebook",
    handle: "@NazliTechSchool",
    url: " https://www.facebook.com/profile.php?id=61572922659307",
    icon: FacebookIcon,
    brandColor: "#1877F2",
  },
  {
    name: "Instagram",
    handle: "@nazlitechschool",
    url: "https://www.instagram.com/nazli_tech/",
    icon: InstagramIcon,
    brandColor: "#E1306C",
  },

  {
    name: "X (Twitter)",
    handle: "@NazliTechSchool",
    url: "https://x.com/NazliTechSchool",
    icon: XIcon,
    brandColor: "#FFFFFF",
  },
  {
    name: "Tiktok",
    handle: "@nazlitechschool",
    url: "https://www.tiktok.com/@nazlitechschool",
    icon: TikTokIcon,
    brandColor: "#25F4EE",
  },

  {
    name: "Pinterest",
    handle: "@nazlitech",
    url: "https://www.pinterest.com/alisia_habibi92/",
    icon: PinterestIcon,
    brandColor: "#E60023",
  },
  {
    name: "TPT",
    handle: "Nazli Tech",
    url: "https://www.teacherspayteachers.com/store/nazli-tech-school",
    icon: TPTIcon,
    brandColor: "#55B336",
  },
  {
    name: "Quora",
    handle: "Nazli Tech School",
    url: " https://nazlitechschoolevolvelearning.quora.com/",
    icon: QuoraIcon,
    brandColor: "#B92B27",
  },
  {
    name: "Discord",
    handle: "Nazli Tech Community",
    url: "https://discord.gg/PWk7BWrP4",
    icon: DiscordIcon,
    brandColor: "#5865F2",
  },
];

const SocialHub = memo(function SocialHub() {
  return (
    <section className="relative z-10 mt-16 w-full px-4 md:mt-20">
      <div className="w-full  ">
        <div className="mb-10 text-center md:text-center">
          <h4 className="mb-2 text-[11px] font-black uppercase tracking-[0.3em] text-amber-300 sm:text-xs">
            Connect With Us
          </h4>
          <h2 className="text-2xl text-purple-400 font-black uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Digital{" "}
            <span className="bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2 lg:grid-cols-4">
          {SOCIAL_PLATFORMS.map((platform, index) => {
            const Icon = platform.icon;

            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative flex overflow-hidden rounded-[1.5rem] p-[1px]"
              >
                <div className="animate-border-spin absolute inset-0 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="landing-primary-cta relative z-10 !flex h-full w-full flex-col p-2 group-hover:border-transparent !rounded-[calc(1.5rem-1px)]">
                  <div
                    className="mb-2 transition-all duration-300 group-hover:scale-110"
                    style={{ color: "#d8b4fe" }}
                  >
                    <div
                      className="transition-colors group-hover:!text-[var(--brand-color)] scale-75"
                      style={{ "--brand-color": platform.brandColor } as any}
                    >
                      <Icon />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="whitespace-nowrap text-[10px] md:text-[11px] font-bold text-white">
                      {platform.name}
                    </p>
                    <p className="max-w-[80px] truncate text-[8px] text-white/30 hidden md:block">
                      {platform.handle}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default SocialHub;
