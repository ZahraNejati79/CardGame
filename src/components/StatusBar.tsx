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
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div>Time:</div>
        <div className="font-bold">
          <Timer totalTime={time} onFinish={onFinish} onMount={onMount} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>Moves:</div>
        <div className="font-bold">{actionNumber}</div>
      </div>
    </div>
  );
}

export default StatusBar;
