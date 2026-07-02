import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextType {
  currentAudio: HTMLAudioElement | null;
  playAudio: (audioSrc: string, sectionId: string) => void;
  stopCurrentAudio: () => void;
  isMuted: boolean;
  isPaused: boolean;
  setIsMuted: (muted: boolean) => void;
  setIsPaused: (paused: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentSectionRef = useRef<string | null>(null);
  // Remember the section that asked to speak while the intro video owns audio focus.
  const pendingAudioRef = useRef<{
    audioSrc: string;
    sectionId: string;
  } | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPausedState] = useState(false);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudioRef.current) {
      console.log(
        `[Audio] Stopping audio from section: ${currentSectionRef.current}`,
      );
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      currentSectionRef.current = null;
    }
  }, []);

  const startAudio = useCallback(
    (audioSrc: string, sectionId: string) => {
      if (currentSectionRef.current === sectionId && currentAudioRef.current) {
        if (currentAudioRef.current.paused) {
          console.log(
            `[Audio] Resuming paused audio for section: ${sectionId}`,
          );
          setIsPausedState(false);
          currentAudioRef.current.play().catch((error) => {
            console.error(`[Audio] Resume failed for ${sectionId}:`, error);
          });
        } else {
          console.log(
            `[Audio] Audio already playing for section: ${sectionId}`,
          );
        }
        return;
      }

      stopCurrentAudio();

      try {
        console.log(`[Audio] Playing audio for section: ${sectionId}`);
        const audio = new Audio(audioSrc);
        setIsPausedState(false);

        audio.onplay = () => {
          console.log(`[Audio] Successfully playing: ${sectionId}`);
        };

        audio.onerror = (e) => {
          console.error(`[Audio] Error playing audio for ${sectionId}:`, e);
        };

        audio.play().catch((error) => {
          console.error(`[Audio] Playback failed for ${sectionId}:`, error);
        });

        currentAudioRef.current = audio;
        currentSectionRef.current = sectionId;
      } catch (error) {
        console.error(
          `[Audio] Error creating audio element for ${sectionId}:`,
          error,
        );
      }
    },
    [stopCurrentAudio],
  );

  const playAudio = useCallback(
    (audioSrc: string, sectionId: string) => {
      if (isMuted) {
        console.log(
          `[Audio] Audio muted - video still playing. Queuing section audio for section: ${sectionId}`,
        );
        pendingAudioRef.current = { audioSrc, sectionId };
        return;
      }

      if (isPaused) {
        console.log(
          `[Audio] Audio paused by user - buffering request for section: ${sectionId}`,
        );
        pendingAudioRef.current = { audioSrc, sectionId };
        return;
      }

      // A live section request replaces any stale queued narration.
      pendingAudioRef.current = null;
      startAudio(audioSrc, sectionId);
    },
    [isMuted, isPaused, startAudio],
  );

  const setPaused = useCallback(
    (paused: boolean) => {
      setIsPausedState(paused);
      if (paused) {
        if (currentAudioRef.current && !currentAudioRef.current.paused) {
          currentAudioRef.current.pause();
        }
      } else {
        if (pendingAudioRef.current && !isMuted) {
          const { audioSrc, sectionId } = pendingAudioRef.current;
          pendingAudioRef.current = null;
          startAudio(audioSrc, sectionId);
          return;
        }

        if (currentAudioRef.current?.paused && !isMuted) {
          currentAudioRef.current.play().catch((error) => {
            console.error(`[Audio] Resume failed after pause:`, error);
          });
        }
      }
    },
    [isMuted, startAudio],
  );

  const setMuted = useCallback(
    (muted: boolean) => {
      setIsMuted(muted);
      if (muted) {
        if (currentAudioRef.current && !currentAudioRef.current.paused) {
          currentAudioRef.current.pause();
        }
      } else if (currentAudioRef.current && currentAudioRef.current.paused) {
        if (!pendingAudioRef.current && !isPaused) {
          currentAudioRef.current.play().catch((error) => {
            console.error(`[Audio] Resume failed after unmute:`, error);
          });
        }
      }
    },
    [isPaused],
  );

  useEffect(() => {
    if (isMuted || isPaused || !pendingAudioRef.current) return;

    const { audioSrc, sectionId } = pendingAudioRef.current;
    pendingAudioRef.current = null;
    startAudio(audioSrc, sectionId);
  }, [isMuted, isPaused, startAudio]);

  useEffect(() => {
    if (isMuted || isPaused) return;
    if (!pendingAudioRef.current && currentAudioRef.current?.paused) {
      currentAudioRef.current.play().catch((error) => {
        console.error(`[Audio] Resume failed after unmute effect:`, error);
      });
    }
  }, [isMuted, isPaused]);

  return (
    <AudioContext.Provider
      value={{
        currentAudio: currentAudioRef.current,
        playAudio,
        stopCurrentAudio,
        isMuted,
        isPaused,
        setIsMuted: setMuted,
        setIsPaused: setPaused,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}
