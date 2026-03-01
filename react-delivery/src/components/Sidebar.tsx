import {
  Home,
  LayoutGrid,
  ShoppingBag,
  Heart,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: "home", icon: Home, path: "/" },
  { id: "grid", icon: LayoutGrid, path: "/grid" },
  { id: "cart", icon: ShoppingBag, path: "/cart" },
  { id: "favorites", icon: Heart, path: "/favorites" },
  { id: "messages", icon: MessageSquare, path: "/messages" },
  { id: "settings", icon: SettingsIcon, path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col items-center justify-between w-[104px] min-h-screen bg-sidebar py-8">
      {/* Top */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground font-bold text-lg">
            JP
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" &&
                location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon size={22} />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <button className="w-12 h-12 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
        <LogOut size={22} />
      </button>
    </aside>
  );
}