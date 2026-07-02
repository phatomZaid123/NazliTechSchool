"use client";

import { useEffect, useRef } from "react";
import PerfumeIcon from "@/assets/perfumeicon.png";
import SpraySound from "@/assets/spray-sound.mp3";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const displayX = useRef(0);
  const displayY = useRef(0);
  const isOverIframe = useRef(false);

  useEffect(() => {
    const setCursorVisible = (isVisible: boolean) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.opacity = isVisible ? "1" : "0";
    };

    const isIframeElement = (element: Element | null) =>
      element instanceof HTMLIFrameElement || Boolean(element?.closest("iframe"));

    const updateIframeHoverState = (x: number, y: number) => {
      const isInsideIframe = isIframeElement(document.elementFromPoint(x, y));
      isOverIframe.current = isInsideIframe;
      setCursorVisible(!isInsideIframe);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      updateIframeHoverState(e.clientX, e.clientY);
    };

    const handleClick = () => {
      if (audioRef.current && !isOverIframe.current) {
        audioRef.current.currentTime = 0; // Reset sound to start
        audioRef.current.play();
      }
    };

    const handleMouseEnterIframe = () => {
      isOverIframe.current = true;
      setCursorVisible(false);
    };

    const handleMouseLeaveIframe = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      if (
        typeof pointerEvent.clientX === "number" &&
        typeof pointerEvent.clientY === "number"
      ) {
        updateIframeHoverState(pointerEvent.clientX, pointerEvent.clientY);
        return;
      }

      isOverIframe.current = false;
      setCursorVisible(true);
    };

    const bindIframeListeners = (root: ParentNode = document) => {
      root.querySelectorAll("iframe").forEach((iframe) => {
        iframe.addEventListener("pointerenter", handleMouseEnterIframe);
        iframe.addEventListener("pointerleave", handleMouseLeaveIframe);
      });
    };

    const unbindIframeListeners = (root: ParentNode = document) => {
      root.querySelectorAll("iframe").forEach((iframe) => {
        iframe.removeEventListener("pointerenter", handleMouseEnterIframe);
        iframe.removeEventListener("pointerleave", handleMouseLeaveIframe);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    bindIframeListeners();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node instanceof HTMLIFrameElement) {
              node.addEventListener("pointerenter", handleMouseEnterIframe);
              node.addEventListener("pointerleave", handleMouseLeaveIframe);
              return;
            }

            bindIframeListeners(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      observer.disconnect();
      unbindIframeListeners();
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateCursorPosition = () => {
      // Smooth easing for cursor follow
      displayX.current += (mouseX.current - displayX.current) * 0.8;
      displayY.current += (mouseY.current - displayY.current) * 0.8;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${displayX.current - 20}px, ${displayY.current - 20}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursorPosition);
    };

    animationFrameId = requestAnimationFrame(updateCursorPosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* Audio element for spray sound */}
      <audio ref={audioRef} src={SpraySound} preload="auto" />

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10"
      >
        <img
          src={PerfumeIcon}
          alt="Perfume cursor"
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
            mixBlendMode: "darken",
          }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
      </div>
    </>
  );
}
