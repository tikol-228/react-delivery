import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MenuItem } from "@/data/menuData";

export interface FavoritesContextType {
  favorites: MenuItem[];
  addFavorite: (item: MenuItem) => void;
  removeFavorite: (item: MenuItem) => void;
  toggleFavorite: (item: MenuItem) => void;
  isFavorite: (item: MenuItem) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<MenuItem[]>([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) {
        setFavorites(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to load favorites from storage", e);
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to storage", e);
    }
  }, [favorites]);

  const addFavorite = (item: MenuItem) => {
    setFavorites((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = (item: MenuItem) => {
    setFavorites((prev) => prev.filter((i) => i.id !== item.id));
  };

  const toggleFavorite = (item: MenuItem) => {
    setFavorites((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (item: MenuItem) => favorites.some((i) => i.id === item.id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
};
