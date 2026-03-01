import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food-5.jpg";
import food6 from "@/assets/food-6.jpg";
import food7 from "@/assets/food-7.jpg";
import food8 from "@/assets/food-8.jpg";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  available: number;
  category: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const menuItems: MenuItem[] = [
  { id: 1, name: "Spicy seasoned seafood noodles", price: 2.29, image: food1, available: 20, category: "Hot Dishes" },
  { id: 2, name: "Salted pasta with mushroom sauce", price: 2.69, image: food2, available: 11, category: "Hot Dishes" },
  { id: 3, name: "Beef dumpling in hot and sour soup", price: 2.99, image: food3, available: 16, category: "Hot Dishes" },
  { id: 4, name: "Healthy noodle with spinach leaf", price: 3.29, image: food4, available: 22, category: "Hot Dishes" },
  { id: 5, name: "Hot spicy fried rice with omelet", price: 3.49, image: food5, available: 13, category: "Hot Dishes" },
  { id: 6, name: "Spicy instant noodle with special omelette", price: 3.59, image: food6, available: 17, category: "Hot Dishes" },
  { id: 7, name: "Spicy seasoned seafood noodles", price: 2.29, image: food7, available: 20, category: "Cold Dishes" },
  { id: 8, name: "Salted pasta with mushroom sauce", price: 2.69, image: food8, available: 11, category: "Cold Dishes" },
  { id: 9, name: "Beef dumpling in hot soup", price: 2.99, image: food1, available: 16, category: "Soup" },
  { id: 10, name: "Healthy noodle bowl", price: 3.29, image: food3, available: 22, category: "Soup" },
  { id: 11, name: "Grilled salmon steak", price: 5.49, image: food6, available: 8, category: "Grill" },
  { id: 12, name: "Grilled chicken breast", price: 4.29, image: food4, available: 14, category: "Grill" },
  { id: 13, name: "Spring rolls", price: 1.99, image: food7, available: 30, category: "Appetizer" },
  { id: 14, name: "Chocolate lava cake", price: 4.99, image: food8, available: 9, category: "Dessert" },
];

export const categories = ["Hot Dishes", "Cold Dishes", "Soup", "Grill", "Appetizer", "Dessert"];
