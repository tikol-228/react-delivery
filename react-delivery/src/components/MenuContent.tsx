import { useState } from "react";
import { Search } from "lucide-react";
import FoodCard from "./FoodCard";
import { menuItems, categories, MenuItem } from "@/data/menuData";

interface MenuContentProps {
  onAddItem: (item: MenuItem) => void;
}

const MenuContent = ({ onAddItem }: MenuContentProps) => {
  const [activeCategory, setActiveCategory] = useState("Hot Dishes");
  const [search, setSearch] = useState("");

  const filteredItems = menuItems.filter(
    (item) =>
      item.category === activeCategory &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Jaegar Resto</h1>
          <p className="text-sm text-muted-foreground mt-1">Tuesday, 2 Feb 2021</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search for food, coffee, etc.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px] h-12 rounded-lg bg-card border-none pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-pos-card-hover"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sub Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-foreground">Choose Dishes</h2>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-14 overflow-y-auto pb-8 pt-10">
        {filteredItems.map((item) => (
          <FoodCard key={item.id} item={item} onAdd={onAddItem} />
        ))}
      </div>
    </div>
  );
};

export default MenuContent;
