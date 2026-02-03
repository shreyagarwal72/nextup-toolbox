import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import nextupLogo from "@/assets/nextup-logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="glass-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <img 
                src={nextupLogo} 
                alt="Nextup Tools" 
                className="w-10 h-10 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">
                Nextup Tools
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                All Webtools in One Place
              </span>
            </div>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-3">
            {!isHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back
              </Button>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle group"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
                  theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`} />
                <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
                  theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
