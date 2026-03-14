import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { FavoritesProvider } from "./context/FavoritesContext";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Favorites from "./components/Favorites";
import Chat from "./components/Chat";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <FavoritesProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/messages" element={<Chat/>}/>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </TooltipProvider>
      </QueryClientProvider>
    </FavoritesProvider>
  </ThemeProvider>
);

export default App;