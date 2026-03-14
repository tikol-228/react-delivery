import { MenuItem } from "@/data/menuData";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface FoodCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
}

const FoodCard = ({ item, onAdd }: FoodCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(item);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  const handleAddClick = () => {
    if (onAdd) {
      onAdd(item);
    }
  };

  return (
    <div className="relative">
      {/* favorite star */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-20 p-1 rounded-full transition-transform hover:scale-125 active:scale-95 group/fav"
      >
        <Heart
          size={18}
          className={`transition-all duration-300 ${
            favorited 
              ? "text-red-500 fill-red-500" 
              : "text-gray-400 group-hover/fav:text-red-400 group-hover/fav:fill-red-400/30"
          }`}
        />
      </button>

      <button
        onClick={handleAddClick}
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
    </div>
  );
};

export default FoodCard;
