import { createContext, useContext, useRef, useCallback, ReactNode, useEffect, useState } from "react";

export type SectionId = 
  | "home" 
  | "video-feed" 
  | "courses" 
  | "curriculum" 
  | "simulation" 
  | "apps" 
  | "pricing" 
  | "testimonials" 
  | "articles" 
  | "about" 
  | "contact";

const SECTION_ORDER: SectionId[] = [
  "home",
  "video-feed",
  "courses",
  "curriculum",
  "simulation",
  "apps",
  "pricing",
  "testimonials",
  "articles",
  "about",
  "contact",
];

interface PreloadContextType {
  preloadSection: (sectionId: SectionId) => void;
  preloadSectionsAhead: (currentSection: SectionId, count?: number) => void;
  registerPreloader: (sectionId: SectionId, preloadFn: () => void) => void;
}

const PreloadContext = createContext<PreloadContextType | undefined>(undefined);

export function PreloadProvider({ children }: { children: ReactNode }) {
  const preloadersRef = useRef<Map<SectionId, () => void>>(new Map());
  const preloadedRef = useRef<Set<SectionId>>(new Set());

  const preloadSection = useCallback((sectionId: SectionId) => {
    if (preloadedRef.current.has(sectionId)) {
      return;
    }

    preloadedRef.current.add(sectionId);
    const preloadFn = preloadersRef.current.get(sectionId);
    if (preloadFn) {
      try {
        preloadFn();
      } catch (err) {
        console.error(`Failed to preload section ${sectionId}:`, err);
      }
    }
  }, []);

  const preloadSectionsAhead = useCallback((currentSection: SectionId, count = 2) => {
    const currentIndex = SECTION_ORDER.indexOf(currentSection);
    if (currentIndex === -1) return;

    for (let i = 1; i <= count; i++) {
      const nextSection = SECTION_ORDER[currentIndex + i];
      if (nextSection) {
        preloadSection(nextSection);
      }
    }
  }, [preloadSection]);

  const registerPreloader = useCallback((sectionId: SectionId, preloadFn: () => void) => {
    preloadersRef.current.set(sectionId, preloadFn);
  }, []);

  return (
    <PreloadContext.Provider value={{ preloadSection, preloadSectionsAhead, registerPreloader }}>
      {children}
    </PreloadContext.Provider>
  );
}

export function usePreload() {
  const context = useContext(PreloadContext);
  if (!context) {
    throw new Error("usePreload must be used within PreloadProvider");
  }
  return context;
}
