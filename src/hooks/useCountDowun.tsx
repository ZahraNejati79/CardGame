import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  totalTime?: number;
  onFinish?: () => void;
};

function useCountDowun({ totalTime = 120, onFinish }: Props) {
  const [countDown, setCountDown] = useState(totalTime);
  const timeoutRef = useRef<number | null>(null);

  const timeLeft = useMemo(() => {
    const minutes = Math.floor(countDown / 60);
    const seconds = countDown % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [countDown]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current!);
  }, []);

  const decrementCount = useCallback(() => {
    setCountDown((prev) => {
      if (prev <= 1) {
        stopCountdown();
        onFinish && onFinish();
        return 0;
      }
      return prev - 1;
    });

    if (timeoutRef.current)
      timeoutRef.current = window.setTimeout(decrementCount, 1000);
  }, [onFinish]);

  const startCountdown = useCallback(() => {
    if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(decrementCount, 1000);
    }
  }, [decrementCount]);

  const stopCountdown = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetCountDown = useCallback(() => {
    stopCountdown();
    setCountDown(totalTime);
  }, [stopCountdown, totalTime]);

  return {
    timeLeft,
    stopCountdown,
    startCountdown,
    resetCountDown,
  };
}

export default useCountDowun;
