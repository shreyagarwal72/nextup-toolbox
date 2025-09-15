import { useEffect, useState } from "react";
import nextupLogo from "@/assets/nextup-logo.png";

const IntroScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="intro-screen">
      <div className="relative">
        <img 
          src={nextupLogo} 
          alt="Nextup Tools Logo" 
          className="intro-logo animate-pulse-glow"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-primary-glow/30 to-primary/20 animate-spin-slow opacity-75"></div>
      </div>
    </div>
  );
};

export default IntroScreen;