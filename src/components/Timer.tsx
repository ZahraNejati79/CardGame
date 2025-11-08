import { memo, useEffect } from "react";
import useCountdown from "../hooks/useCountdown";
import type { TimerController } from "../types/modules";

type Props = {
  totalTime: number;
  onFinish: () => void;
  onMount: (ctrls: TimerController) => void;
};

function Timer({ totalTime, onFinish, onMount }: Props) {
  const { resetCountDown, startCountdown, stopCountdown, timeLeft } =
    useCountdown({ totalTime, onFinish });

  useEffect(() => {
    onMount?.({
      start: startCountdown,
      reset: resetCountDown,
      stop: stopCountdown,
    });
  }, [startCountdown, stopCountdown, resetCountDown]);

  useEffect(() => {
    resetCountDown();
  }, [totalTime]);

  return (
    <div>
      <span>{timeLeft}</span>
    </div>
  );
}

export default memo(Timer);
