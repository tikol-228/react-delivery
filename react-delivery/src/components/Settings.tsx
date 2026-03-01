import { useTheme } from "../hooks/use-theme";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
    >
      Theme: {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
} 