type Props = {
  isFinished: boolean;
  isWin: Boolean;
  onRestart: (newAction?: number) => void;
};

function GameResultOverlay({ isFinished, isWin, onRestart }: Props) {
  return (
    isFinished && (
      <div
        className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300
      ${isWin ? "bg-green-400/30" : "bg-red-400/30"}
    `}
      >
        <div className="m-2 flex flex-col items-center gap-6 bg-white/90 shadow-2xl rounded-3xl px-10 py-8 text-center animate-fadeIn">
          <div className="text-5xl font-extrabold">
            {isWin ? "🎉 You Won!" : "😢 You Lost!"}
          </div>

          <div className="text-gray-700 text-lg">
            {isWin
              ? "Congratulations! You matched all the cards correctly."
              : "Try again! You can do better next time."}
          </div>

          <button
            onClick={() => onRestart()}
            className={`px-8 py-3 rounded-2xl font-semibold text-xl transition-all duration-200 cursor-pointer
          ${
            isWin
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }
        `}
          >
            Restart Game
          </button>
        </div>
      </div>
    )
  );
}

export default GameResultOverlay;
