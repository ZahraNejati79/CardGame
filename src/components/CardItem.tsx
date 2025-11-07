import type { Card } from "../types/modules";

type Props = {
  isVisible: boolean;
  isActive: boolean;
  isAnswerd: boolean;
  isFailed: boolean;
  item: Card;
  handleCheckSameItems: (item: Card) => Promise<void>;
};

function CardItem({
  item,
  isActive,
  isVisible,
  isAnswerd,
  isFailed,
  handleCheckSameItems,
}: Props) {
  return (
    <div
      onClick={() => isActive && !isAnswerd && handleCheckSameItems(item)}
      className={`${
        isAnswerd ? "bg-green-300" : isFailed ? "bg-red-300" : ""
      } flex items-center justify-center cursor-pointer border border-gray-500 rounded-2xl`}
      key={item.id}
    >
      <div className="text-3xl sm:text-5xl p-4  sm:p-8">
        {isAnswerd ? item.text : isVisible ? item.text : "*"}
      </div>
    </div>
  );
}

export default CardItem;
