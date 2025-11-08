import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CardItem from "./CardItem";
import type { Card, TimerController } from "../types/modules";
import { fruitsArray } from "../constants";
import StatusBar from "./StatusBar";
import Modal from "./Modal";
import SettingsForm from "./SettingsForm";
import GameResultOverlay from "./GameResultOverlay";

const initailSettings = { actionNumber: 20, time: 120 };

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function CardGame() {
  const [cards, setCards] = useState<Card[]>(() => shuffleArray(fruitsArray));
  const [firstOption, setFirstOption] = useState<Card>();
  const [secondOption, setSecondOption] = useState<Card>();
  const [correctItems, setCorrectItems] = useState<Card[]>([]);
  const [actionNumber, setActionNumber] = useState(
    initailSettings.actionNumber
  );
  const [time, setTime] = useState(initailSettings.time);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerControls, setTimerControls] = useState<TimerController>();
  const [formInputs, setFormInputs] = useState(initailSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const onFinish = useCallback(() => {
    setIsTimeOver(true);
  }, []);

  const isFinished = useMemo<boolean>(() => {
    return (
      actionNumber <= 0 || correctItems.length === cards.length || isTimeOver
    );
  }, [actionNumber, correctItems, cards.length, isTimeOver]);

  const isWin = useMemo(() => {
    return correctItems.length === cards.length;
  }, [isFinished]);

  const handleRestartGame = useCallback(
    (newAction: number = formInputs.actionNumber) => {
      setFirstOption(undefined);
      setSecondOption(undefined);
      setCorrectItems([]);
      setActionNumber(newAction);
      setGameStarted(false);
      setIsTimeOver(false);
      setCards(shuffleArray(fruitsArray));
      timerControls?.reset();
    },
    [formInputs.actionNumber, timerControls]
  );

  const handleCheckAnswer = useCallback(
    (item: Card) => {
      if (item.text === firstOption?.text) {
        setCorrectItems((prev) => [...prev, firstOption, item]);
      }
    },
    [firstOption]
  );

  const handleSelectCard = useCallback(
    (item: Card) => {
      if (!gameStarted) {
        setGameStarted(true);
        timerControls?.start();
      }

      setActionNumber((prev) => prev - 1);

      if (firstOption) {
        if (item.id === firstOption.id) return;

        setSecondOption(item);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          handleCheckAnswer(item);
          setFirstOption(undefined);
          setSecondOption(undefined);
        }, 2000);
      } else {
        setFirstOption(item);
      }
    },
    [firstOption, gameStarted, timerControls, handleCheckAnswer]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormInputs((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTime = Number(formInputs.time);
    const newAction = Number(formInputs.actionNumber);

    setTime(newTime);
    setActionNumber(newAction);
    handleRestartGame(newAction);
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <StatusBar
        time={time}
        actionNumber={actionNumber}
        onFinish={onFinish}
        onMount={(ctrls: TimerController) => setTimerControls(ctrls)}
      />

      <Modal open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsForm
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
          formInputs={formInputs}
        />
      </Modal>

      <div className="grid grid-cols-4 gap-4">
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
              onSelect={handleSelectCard}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-evenly divide-x rounded-md border border-slate-500">
        <div
          onClick={() => handleRestartGame()}
          className="bg-slate-500 font-bold text-white w-full p-4 cursor-pointer flex items-center justify-center gap-2 rounded-l-md"
        >
          RESTART
        </div>
        <div
          onClick={() => setIsSettingsOpen(true)}
          className="w-full p-4 cursor-pointer flex items-center justify-center gap-2 rounded-r-md"
        >
          SETTINGS
        </div>
      </div>

      <GameResultOverlay
        isFinished={isFinished}
        isWin={isWin}
        onRestart={handleRestartGame}
      />
    </div>
  );
}

export default CardGame;
