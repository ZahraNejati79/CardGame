import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  totalTime?: number;
  onFinish?: () => void;
};

function useCountDowun({ totalTime = 120, onFinish }: Props) {
  const [countDown, setCountDown] = useState(totalTime);
  const intervalRef = useRef<number | null>(null);

  const remideTime = useMemo(() => {
    return `${Math.floor(countDown / 60)}:${countDown % 60}`;
  }, [countDown]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startCountdown = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onFinish && onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetCountDown = useCallback(() => {
    stopCountdown();
    setCountDown(totalTime);
  }, [stopCountdown, totalTime]);

  return {
    remideTime,
    stopCountdown,
    startCountdown,
    resetCountDown,
  };
}

export default useCountDowun;
