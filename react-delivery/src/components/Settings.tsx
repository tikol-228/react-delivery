import { useTheme } from "../hooks/use-theme";
import db from "../../../server/db.json";
import Profile from "./Profile";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";


export default function Settings() {

  const { theme, toggleTheme } = useTheme();

  const payment = () => {

  const bills = JSON.stringify(db.orders);
    
    if (!bills) return "No bills found";
    try {
      const parsed = JSON.parse(bills);
      if (!Array.isArray(parsed)) return "Invalid bills data";
      const total = parsed.reduce((sum, bill) => sum + (bill.total || 0), 0);
      const avg = total / parsed.length;
      return `$${avg.toFixed(2)}`;
    } catch (e) {
      console.error("Failed to parse bills", e);
      return "Error loading bills";
    }
  }

  return (
    <>
    <section>
      <div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
          >
        Theme: {theme === "dark" ? "Dark" : "Light"}
      </button>
      </div>

      <div className="">
        <h3>Сheckout your average bill</h3>
        <p>{payment()}</p>
      </div>

      <div>
          <h3>Edit Profile</h3>
          <Button><Link to={'/profile'}>edit</Link></Button>
      </div>
    </section>
    </>
  );
} 