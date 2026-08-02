"use client";

import React, { useRef, useEffect, useCallback } from "react"
import type { HTMLAttributes } from "react"
import { Battery, Wifi, SignalHigh } from "lucide-react"

const PHONE_WIDTH = 433
const PHONE_HEIGHT = 882
const SCREEN_X = 21.25
const SCREEN_Y = 19.25
const SCREEN_WIDTH = 389.5
const SCREEN_HEIGHT = 843.5
const SCREEN_RADIUS = 55.75

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100

// ─── Global Video Coordinator ────────────────────────────────────
// Safari/Edge only allow ONE video to autoplay at a time.
// This coordinator queues all videos and plays them sequentially,
// waiting for each to actually start before moving to the next.
// It also listens for user interaction as a fallback trigger.

const videoQueue: HTMLVideoElement[] = [];
let isProcessing = false;
let userHasInteracted = false;

function forcePlay(video: HTMLVideoElement): Promise<void> {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");

  return new Promise((resolve) => {
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.then(() => resolve()).catch(() => {
        // Wait and retry once
        setTimeout(() => {
          video.play().then(() => resolve()).catch(() => resolve());
        }, 200);
      });
    } else {
      resolve();
    }
  });
}

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;

  for (let i = 0; i < videoQueue.length; i++) {
    const video = videoQueue[i];
    if (video && video.paused) {
      await forcePlay(video);
      // Small gap between play calls — Safari needs breathing room
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  isProcessing = false;
}

function registerVideo(video: HTMLVideoElement) {
  if (!videoQueue.includes(video)) {
    videoQueue.push(video);
  }
  // Try to process whenever a new video registers
  processQueue();
}

function unregisterVideo(video: HTMLVideoElement) {
  const idx = videoQueue.indexOf(video);
  if (idx !== -1) videoQueue.splice(idx, 1);
}

// Listen for ANY user interaction — once detected, force-play all videos
if (typeof window !== "undefined") {
  const onInteraction = () => {
    if (userHasInteracted) return;
    userHasInteracted = true;
    processQueue();
    // Clean up
    document.removeEventListener("touchstart", onInteraction);
    document.removeEventListener("click", onInteraction);
    document.removeEventListener("scroll", onInteraction);
  };
  document.addEventListener("touchstart", onInteraction, { passive: true });
  document.addEventListener("click", onInteraction, { passive: true });
  document.addEventListener("scroll", onInteraction, { passive: true });
}

// ─── Component ───────────────────────────────────────────────────

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  videoSrc?: string
  startTime?: number
}

export function Iphone({
  src,
  videoSrc,
  startTime = 1,
  className,
  style,
  ...props
}: IphoneProps) {
  const hasVideo = !!videoSrc
  const hasMedia = hasVideo || !!src
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!hasVideo || !video) return;

    // Force muted for Safari
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    // Skip first `startTime` seconds
    const handleLoadedData = () => {
      if (video.currentTime < startTime) {
        video.currentTime = startTime;
      }
    };

    const handleEnded = () => {
      video.currentTime = startTime;
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (video.currentTime < startTime) {
        video.currentTime = startTime;
      }
    };

    // Re-attempt play if video gets paused unexpectedly
    const handlePause = () => {
      // Only resume if video is in viewport
      if (video.currentTime > 0 && !video.ended) {
        setTimeout(() => {
          if (video.paused && !video.ended) {
            video.play().catch(() => {});
          }
        }, 300);
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("pause", handlePause);

    video.addEventListener("ended", handleEnded);

    // Initial register
    registerVideo(video);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            processQueue();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      unregisterVideo(video);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [hasVideo, videoSrc, startTime]);

  const StatusBar = () => (
    <>
      <div 
        className="absolute inset-x-0 flex items-center justify-between z-30 text-black"
        style={{ top: "3.6cqw", height: "8.2cqw", paddingLeft: "8.2cqw", paddingRight: "5.1cqw" }}
      >
        <span className="font-semibold tracking-tight" style={{ fontSize: "3.85cqw" }}>1:47</span>
        <div className="flex items-center" style={{ gap: "1.5cqw" }}>
          <SignalHigh strokeWidth={2.5} style={{ width: "4.1cqw", height: "4.1cqw" }} />
          <Wifi strokeWidth={2.5} style={{ width: "4.1cqw", height: "4.1cqw" }} />
          <Battery strokeWidth={2} fill="currentColor" style={{ width: "6.16cqw", height: "6.16cqw" }} />
        </div>
      </div>
      <div 
        className="absolute inset-x-0 mx-auto bg-black z-20"
        style={{ top: "3.6cqw", width: "30.8cqw", height: "8.2cqw", borderRadius: "5.1cqw" }}
      ></div>
    </>
  );

  const screenStyle = {
    left: `${LEFT_PCT}%`,
    top: `${TOP_PCT}%`,
    width: `${WIDTH_PCT}%`,
    height: `${HEIGHT_PCT}%`,
    borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
    containerType: "inline-size" as const,
  };

  return (
    <div
      className={`relative inline-block w-full align-middle leading-none ${className || ""}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        borderRadius: "17.32% / 8.5%",
        ...style,
      }}
      {...props}
    >
      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <path
          d="M2 75C2 33.5786 35.5786 0 77 0H355C396.421 0 430 33.5786 430 75V807C430 848.421 396.421 882 355 882H77C35.5786 882 2 848.421 2 807V75Z"
          className="fill-[#E2E2E2] dark:fill-[#404040]"
        />
        <path
          d="M0 75C0 33.5786 33.5786 0 75 0H357C398.421 0 432 33.5786 432 75V807C432 848.421 398.421 882 357 882H75C33.5786 882 0 848.421 0 807V75Z"
          className="fill-[#E2E2E2] dark:fill-[#404040]"
        />
        <path
          d="M1 75C1 34.1309 34.1309 1 75 1H357C397.869 1 431 34.1309 431 75V807C431 847.869 397.869 881 357 881H75C34.1309 881 1 847.869 1 807V75Z"
          className="fill-[#F5F5F5] stroke-[#E2E2E2] stroke-[0.5] dark:fill-[#262626] dark:stroke-[#404040]"
        />
        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
          mask={hasMedia ? "url(#screenPunch)" : undefined}
        />
        <defs>
          <mask id="screenPunch" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
            <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} rx={SCREEN_RADIUS} ry={SCREEN_RADIUS} fill="black" />
          </mask>
          <clipPath id="roundedCorners">
            <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} rx={SCREEN_RADIUS} ry={SCREEN_RADIUS} />
          </clipPath>
        </defs>
      </svg>
      
      {hasVideo && (
        <div className="pointer-events-none absolute z-10 overflow-hidden bg-black" style={screenStyle}>
          <StatusBar />
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            className="block size-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        </div>
      )}

      {!hasVideo && src && (
        <div className="pointer-events-none absolute z-10 overflow-hidden bg-white" style={screenStyle}>
          <StatusBar />
          <img src={src} alt="" className="block size-full object-cover object-top" />
        </div>
      )}
    </div>
  )
}
