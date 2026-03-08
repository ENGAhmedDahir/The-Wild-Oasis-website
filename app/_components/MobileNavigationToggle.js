"use client";

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function MobileNavigationToggle({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 -mr-2 text-primary-200 hover:text-primary-100 transition-colors z-[60] flex items-center justify-center relative"
        aria-label="Toggle navigation"
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>

      <div
        className={`${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none md:pointer-events-auto md:translate-y-0 md:opacity-100"
        } absolute top-full left-0 w-full bg-primary-950/95 backdrop-blur-md shadow-2xl py-8 px-6 border-b border-primary-900 
        md:static md:w-auto md:bg-transparent md:p-0 md:border-none md:shadow-none transition-all duration-300 md:block z-[55]`}
      >
        {children}
      </div>
    </>
  );
}
