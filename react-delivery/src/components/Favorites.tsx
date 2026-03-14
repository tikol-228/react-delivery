import FoodCard from './FoodCard';
import { useFavorites } from '@/context/FavoritesContext';
import { MenuItem } from '@/data/menuData';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Check Out Your Favorite Goods</h1>

      {favorites.length === 0 ? (
        <p className="text-muted-foreground">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-x-6 gap-y-14 overflow-y-auto pb-8 pt-10">
          {favorites.map((item: MenuItem) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;