type Card = {
  id: number;
  text: string;
  label: string;
};

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
      } min-w-40 min-h-40 flex items-center justify-center cursor-pointer border border-gray-500 rounded-2xl`}
      key={item.id}
    >
      <div className="p-8 text-5xl">
        {isAnswerd ? item.text : isVisible ? item.text : "*"}
      </div>
    </div>
  );
}

export default CardItem;
