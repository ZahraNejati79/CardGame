export interface Card {
  id: number;
  text: string;
  label: string;
}

export interface TimerController {
  start: () => void;
  stop: () => void;
  reset: () => void;
}
