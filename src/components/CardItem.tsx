import type { Card } from "../types/modules";

type Props = {
  isVisible: boolean;
  isActive: boolean;
  isAnswerd: boolean;
  isFailed: boolean;
  item: Card;
  onSelect: (item: Card) => void;
};

function CardItem({
  item,
  isActive,
  isVisible,
  isAnswerd,
  isFailed,
  onSelect,
}: Props) {
  const isFlipped = isAnswerd || isVisible;
  return (
    <div
      onClick={() => isActive && !isAnswerd && onSelect(item)}
      className="relative cursor-pointer perspective-[1000px]"
    >
      <div
        className={`rounded-2xl p-8 md:p-12 border-8 border-slate-500 flex items-center justify-center
          transition-transform duration-500 transform-3d
          ${isFlipped ? "rotate-y-180" : ""}
          ${isAnswerd ? "bg-green-300" : isFailed ? "bg-red-300" : "bg-white"}
        `}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-3xl sm:text-5xl p-4 sm:p-8 backface-hidden">
          ?
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-3xl sm:text-5xl p-4 sm:p-8 rotate-y-180 backface-hidden">
          {item.text}
        </div>
      </div>
    </div>
  );
}

export default CardItem;
