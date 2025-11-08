import type { TimerController } from "../types/modules";
import Timer from "./Timer";

type Props = {
  time: number;
  actionNumber: number;
  onFinish: () => void;
  onMount: (ctrls: TimerController) => void;
};

function StatusBar({ onFinish, onMount, time, actionNumber }: Props) {
  return (
    <div className="flex items-center justify-evenly bg-slate-500 text-white divide-x rounded-md">
      <div className="w-full p-4 flex items-center justify-center gap-2">
        <div>Time:</div>
        <div className="font-bold">
          <Timer totalTime={time} onFinish={onFinish} onMount={onMount} />
        </div>
      </div>
      <div className="w-full p-4 flex items-center justify-center gap-2">
        <div>Moves:</div>
        <div className="font-bold">{actionNumber}</div>
      </div>
    </div>
  );
}

export default StatusBar;
