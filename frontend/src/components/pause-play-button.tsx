import { PauseIcon, PlayIcon } from "lucide-react";
import { useAudioContext } from "../context/audio-context";

export function PausePlayButton() {
  const { isPaused, setIsPaused } = useAudioContext();

  return (
    <button
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl"
      onClick={() => setIsPaused(!isPaused)}
      aria-label={isPaused ? "Resume audio" : "Pause audio"}
      title={isPaused ? "Resume audio" : "Pause audio"}
    >
      {isPaused ? (
        <PlayIcon className="h-4 w-4" />
      ) : (
        <PauseIcon className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{isPaused ? "Resume" : "Pause"}</span>
    </button>
  );
}
