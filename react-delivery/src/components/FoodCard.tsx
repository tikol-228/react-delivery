import { MenuItem } from "@/data/menuData";

interface FoodCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

const FoodCard = ({ item, onAdd }: FoodCardProps) => {
  return (
    <button
      onClick={() => onAdd(item)}
      className="flex flex-col items-center bg-card rounded-2xl p-4 pt-12 relative hover:bg-pos-card-hover transition-colors text-left w-full group"
    >
      {/* Image */}
      <div className="w-[130px] h-[130px] rounded-full overflow-hidden absolute -top-8 shadow-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="mt-16 text-center w-full">
        <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-1">
          $ {item.price.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.available} Bowls available
        </p>
      </div>
    </button>
  );
};

export default FoodCard;
