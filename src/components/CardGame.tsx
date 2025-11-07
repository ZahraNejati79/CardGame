import { useCallback, useMemo, useState } from "react";
import CardItem from "./CardItem";
import type { Card, TimerController } from "../types/modules";
import { fruitsArray } from "../constants";
import StatusBar from "./StatusBar";

const initailSettings = { actionNumber: 20, time: 5 };

function CardGame() {
  const [cards, setCards] = useState<Card[]>(() =>
    [...fruitsArray].sort(() => Math.random() - 0.5)
  );
  const [firstOption, setFirstOption] = useState<Card>();
  const [secondOption, setSecondOption] = useState<Card>();
  const [correctItems, setCorrectItems] = useState<Card[]>([]);
  const [actionNumber, setActionNumber] = useState(
    initailSettings.actionNumber
  );
  const [time, setTime] = useState(initailSettings.time);
  const [isTimeout, setIsTimeout] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [timerControls, setTimerControls] = useState<TimerController>();
  const [formInputs, setFormInputs] = useState(initailSettings);

  const onFinish = useCallback(() => {
    setIsTimeout(true);
  }, []);

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

  const resetGame = (newAction: number = formInputs.actionNumber) => {
    setFirstOption(undefined);
    setSecondOption(undefined);
    setCorrectItems([]);
    setActionNumber(newAction);
    setStartGame(false);
    setIsTimeout(false);
    timerControls?.reset();
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
      timerControls?.start();
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

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormInputs((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTime = Number(formInputs.time);
    const newAction = Number(formInputs.actionNumber);

    setTime(newTime);
    setActionNumber(newAction);
    resetGame(newAction);
  };

  return (
    <div className="relative flex flex-col gap-8 p-4">
      <StatusBar
        time={time}
        actionNumber={actionNumber}
        onFinish={onFinish}
        onMount={(ctrls: TimerController) => setTimerControls(ctrls)}
      />

      {/* <SettingsForm
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        formInputs={formInputs}
      /> */}

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
              isFailed={!!isFailed}
              handleCheckSameItems={handleCheckSameItems}
            />
          );
        })}
      </div>

      {isFinished && (
        <div className="absolute inset-0 bg-red-100/50">
          <div className="cursor-pointer" onClick={() => resetGame()}>
            شروع بازی
          </div>
          <div>{isWin ? <div>برررررررررردی</div> : <div> باختی</div>}</div>
        </div>
      )}
    </div>
  );
}

export default CardGame;
