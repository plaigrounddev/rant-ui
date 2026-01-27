"use client";

import { Clock } from "lucide-react";

import { motion } from "motion/react";
import type { ComponentProps } from "react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CountdownProps = Omit<
  ComponentProps<"div">,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
> &
  UseCountdownOptions;

export function Countdown({
  loading = false,
  onTick,
  resetOnLoadingChange = true,
  className,
  ...props
}: CountdownProps) {
  const { formattedSeconds, formattedMilliseconds, elapsedTime } = useCountdown(
    {
      loading,
      onTick,
      resetOnLoadingChange,
    }
  );

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1.5 font-medium text-xs",
        "shadow-[0_2px_4px_rgba(0,0,0,0.02),_0_1px_2px_rgba(0,0,0,0.04)]",
        "h-7 min-w-24",
        "shadow-[inset_0px_-2.10843px_0px_0px_rgb(244,241,238),_0px_1.20482px_6.3253px_0px_rgb(244,241,238)]",
        "border border-[#E9E3DD] text-[#36322F]",
        loading ? "text-blue-500" : "text-neutral-500",
        className
      )}
      key={elapsedTime === 0 ? "countdown-0" : "countdown"}
      layoutId="countdown"
      {...props}
    >
      <Clock
        className={cn(
          "h-3.5 w-3.5",
          loading && "animate-[spin_3s_linear_infinite]"
        )}
      />
      <div>
        <div
          className="flex items-baseline font-medium tracking-tight"
          style={{ fontVariantNumeric: "tabular-nums" } as React.CSSProperties}
        >
          <div className="flex items-baseline gap-[2px]">
            <span
              className={cn(
                "text-sm transition-colors duration-200",
                loading ? "text-blue-600" : "text-neutral-600"
              )}
            >
              {formattedSeconds}
            </span>
            <span
              className={cn(
                "font-medium text-[10px] transition-colors duration-200",
                loading ? "text-blue-400" : "text-neutral-400"
              )}
            >
              s
            </span>
          </div>
          <span
            className={cn(
              "mx-0.5 transition-colors duration-200",
              loading ? "text-blue-400/70" : "text-neutral-300"
            )}
          >
            .
          </span>
          <div className="flex items-baseline">
            <span
              className={cn(
                "text-sm transition-colors duration-200",
                loading ? "text-blue-500" : "text-neutral-500"
              )}
            >
              {formattedMilliseconds}
            </span>
            <span
              className={cn(
                "ml-0.5 font-medium text-[10px] transition-colors duration-200",
                loading ? "text-blue-400" : "text-neutral-400"
              )}
            >
              ms
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export interface UseCountdownOptions {
  loading?: boolean;
  onTick?: (seconds: number, milliseconds: number) => void;
  resetOnLoadingChange?: boolean;
}

export interface UseCountdownReturn {
  elapsedTime: number;
  milliseconds: number;
  formattedSeconds: string;
  formattedMilliseconds: string;
  isRunning: boolean;
  reset: () => void;
  start: () => void;
  stop: () => void;
}

export function useCountdown({
  loading = false,
  onTick,
  resetOnLoadingChange = true,
}: UseCountdownOptions = {}): UseCountdownReturn {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const reset = useCallback(() => {
    setElapsedTime(0);
    setMilliseconds(0);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Handle loading prop changes
  useEffect(() => {
    if (loading) {
      if (resetOnLoadingChange) {
        reset();
      }
      start();
    } else {
      stop();
    }
  }, [loading, resetOnLoadingChange, reset, start, stop]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let msTimer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);

      msTimer = setInterval(() => {
        setMilliseconds((prev) => (prev + 10) % 1000);
      }, 10);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (msTimer) clearInterval(msTimer);
    };
  }, [isRunning]);

  // Tick callback effect
  useEffect(() => {
    if (onTick) {
      onTick(elapsedTime, milliseconds);
    }
  }, [elapsedTime, milliseconds, onTick]);

  const formattedSeconds = elapsedTime.toString().padStart(2, "0");
  const formattedMilliseconds = Math.floor(milliseconds / 10)
    .toString()
    .padStart(2, "0");

  return {
    elapsedTime,
    milliseconds,
    formattedSeconds,
    formattedMilliseconds,
    isRunning,
    reset,
    start,
    stop,
  };
}

