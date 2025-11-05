import { useMemo, useState } from "react";
import useCountDowun from "../hooks/useCountDowun";
import CardItem from "./CardItem";

type Card = {
  id: number;
  text: string;
  label: string;
};

const fruitsArray = [
  { id: 1, text: "🍎", label: "🐶" },
  { id: 2, text: "🍎", label: "🐱" },
  { id: 3, text: "🍌", label: "🐭" },
  { id: 4, text: "🍌", label: "🐹" },
  { id: 5, text: "🍊", label: "🐰" },
  { id: 6, text: "🍊", label: "🦊" },
  { id: 7, text: "🍇", label: "🐻" },
  { id: 8, text: "🍇", label: "🐼" },
  { id: 9, text: "🥭", label: "🐨" },
  { id: 10, text: "🥭", label: "🐯" },
  { id: 11, text: "🍍", label: "🦁" },
  { id: 12, text: "🍍", label: "🐮" },
  { id: 13, text: "🍓", label: "🐷" },
  { id: 14, text: "🍓", label: "🐸" },
  { id: 15, text: "🥝", label: "🐵" },
  { id: 16, text: "🥝", label: "🐔" },
];

function CardGame() {
  const [cards, setCards] = useState<Card[]>(() =>
    [...fruitsArray].sort(() => Math.random() - 0.5)
  );
  const [firstOption, setFirstOption] = useState<Card>();
  const [secondOption, setSecondOption] = useState<Card>();
  const [correctItems, setCorrectItems] = useState<Card[]>([]);
  const [actionNumber, setActionNumber] = useState(20);
  const [isTimeout, setIsTimeout] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const { remideTime, startCountdown, resetCountDown } = useCountDowun({
    totalTime: 120,
    onFinish,
  });

  function onFinish() {
    setIsTimeout(true);
  }

  const isFinished = useMemo(() => {
    if (actionNumber <= 0) {
      console.log("actionNumber");
      return true;
    } else if (correctItems.length === cards.length) {
      console.log("correctItems");
      return true;
    } else if (isTimeout) {
      console.log("timeOut", isTimeout);
      return true;
    }
  }, [isTimeout, actionNumber, correctItems]);

  const isWin = useMemo(() => {
    return correctItems.length === cards.length;
  }, [isFinished]);

  const resetGame = () => {
    setFirstOption(undefined);
    setSecondOption(undefined);
    setCorrectItems([]);
    setActionNumber(20);
    setStartGame(false);
    setIsTimeout(false);
    resetCountDown();
  };

  const handleCehckAnswer = (item: Card) => {
    //check two option and show results and reset other cards or all cards
    if (item.text === firstOption?.text) {
      // you win
      setCorrectItems((prev) => [...prev, firstOption, item]);
    } else {
      //reset
    }
  };

  const handleCheckSameItems = async (item: Card) => {
    if (!startGame) {
      setStartGame(true);
      startCountdown();
    }
    setActionNumber((prev) => prev - 1);
    if (firstOption) {
      if (item.id === firstOption.id) {
        return;
      }
      setSecondOption(item);
      setTimeout(() => {
        handleCehckAnswer(item);
        setFirstOption(undefined);
        setSecondOption(undefined);
      }, 2000);
    } else {
      setFirstOption(item);
    }
  };

  return (
    <div className="relative p-4">
      <div className="w-full p-4 bg-red-50">
        <span>{remideTime}</span>
      </div>

      <div className="flex flex-col">
        <span>first-{firstOption?.id}</span>
        <span>second-{secondOption?.id}</span>
        <div>actionNumber-{actionNumber}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((item) => {
          const isVisible =
            item.id === firstOption?.id || item.id === secondOption?.id;
          const isActive = !(firstOption && secondOption);
          const isAnswerd = correctItems.some((i) => i.id === item.id);
          const isFailed =
            firstOption &&
            secondOption &&
            firstOption.text !== secondOption.text &&
            isVisible;

          return (
            <CardItem
              key={item.id}
              isVisible={isVisible}
              isActive={isActive}
              isAnswerd={isAnswerd}
              item={item}
              isFailed={isFailed}
              handleCheckSameItems={handleCheckSameItems}
            />
          );
        })}
      </div>

      {isFinished && (
        <div className="absolute inset-0 bg-red-100/50">
          <div className="cursor-pointer" onClick={resetGame}>
            شروع بازی
          </div>
          <div>{isWin ? <div>برررررررررردی</div> : <div> باختی</div>}</div>
        </div>
      )}
    </div>
  );
}

export default CardGame;
