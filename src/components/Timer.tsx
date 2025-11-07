import { memo, useEffect } from "react";
import useCountDowun from "../hooks/useCountDowun";
import type { TimerController } from "../types/modules";

type Props = {
  totalTime: number;
  onFinish: () => void;
  onMount: (ctrls: TimerController) => void;
};

function Timer({ totalTime, onFinish, onMount }: Props) {
  const { resetCountDown, startCountdown, stopCountdown, timeLeft } =
    useCountDowun({ totalTime, onFinish });

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
