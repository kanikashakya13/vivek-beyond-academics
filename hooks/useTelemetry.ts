"use client";
import { useState, useEffect } from 'react';

export function useTelemetry() {
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    // Start background timer for focus
    const timer = setInterval(() => {
      setFocusSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addRetry = () => setRetries((prev) => prev + 1);

  return { focusSeconds, retries, addRetry };
}