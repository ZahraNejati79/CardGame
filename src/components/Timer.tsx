import { memo } from "react";

type TimerProps = {
  timeLeft: string;
};

function Timer({ timeLeft }: TimerProps) {
  return (
    <div className="w-full p-4 bg-red-50">
      <span>{timeLeft}</span>
    </div>
  );
}

export default memo(Timer);
