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
      <img 
        src={nextupLogo} 
        alt="Nextup Tools Logo" 
        className="intro-logo"
      />
    </div>
  );
};

export default IntroScreen;