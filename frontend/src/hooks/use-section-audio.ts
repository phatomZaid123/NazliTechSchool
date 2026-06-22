import { useEffect, useRef } from "react";
import { useAudioContext } from "@/context/audio-context";

interface UseSectionAudioProps {
  audioSrc: string;
  sectionId: string;
  onAudioPlay?: () => void;
}

/**
 * Custom hook to handle section audio playback
 * Plays audio when section enters viewport and hasn't been played yet in this session
 * Automatically stops any previously playing audio
 */
export function useSectionAudio({
  audioSrc,
  sectionId,
  onAudioPlay,
}: UseSectionAudioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const audioPlayedRef = useRef(false);
  const { playAudio } = useAudioContext();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      console.warn(`[useSectionAudio] Section ref not attached for: ${sectionId}`);
      return;
    }

    // Create intersection observer to detect when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(`[useSectionAudio] ${sectionId} - isIntersecting: ${entry.isIntersecting}, intersectionRatio: ${entry.intersectionRatio}`);
          if (entry.isIntersecting) {
            console.log(`[useSectionAudio] Section visible: ${sectionId}`);
            // Play audio when section enters viewport and hasn't been played yet
            if (!audioPlayedRef.current) {
              console.log(`[useSectionAudio] Triggering audio play for: ${sectionId}`);
              playAudio(audioSrc, sectionId);
              audioPlayedRef.current = true;
              onAudioPlay?.();
            }
          } else {
            console.log(`[useSectionAudio] Section hidden: ${sectionId}`);
            // Reset played flag when section leaves viewport
            // This allows audio to play again if user revisits
            audioPlayedRef.current = false;
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
      },
    );

    console.log(`[useSectionAudio] Observing section: ${sectionId}`);
    observer.observe(section);

    // Check initial visibility - needed for lazy-loaded components
    setTimeout(() => {
      const rect = section.getBoundingClientRect();
      const isCurrentlyVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      const visibilityRatio = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height));
      
      console.log(`[useSectionAudio] Initial visibility check for ${sectionId}: visible=${isCurrentlyVisible}, ratio=${visibilityRatio.toFixed(2)}`);
      
      if (isCurrentlyVisible && visibilityRatio > 0.2 && !audioPlayedRef.current) {
        console.log(`[useSectionAudio] Section already visible on mount, playing audio: ${sectionId}`);
        playAudio(audioSrc, sectionId);
        audioPlayedRef.current = true;
        onAudioPlay?.();
      }
    }, 0);

    return () => {
      console.log(`[useSectionAudio] Stopped observing section: ${sectionId}`);
      observer.disconnect();
    };
  }, [audioSrc, sectionId, playAudio]);

  return sectionRef;
}
