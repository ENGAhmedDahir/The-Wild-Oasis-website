"use client";

import { useState, useEffect } from "react";

export default function HeaderBackground({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled down
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-primary-950/90 backdrop-blur-md border-b border-primary-900 shadow-md py-2 md:py-3" 
          : "bg-transparent py-4 md:py-6"
      } px-4 md:px-8`}
    >
      {children}
    </header>
  );
}
