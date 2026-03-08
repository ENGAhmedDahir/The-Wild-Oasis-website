"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="border-b lg:border-r border-primary-900 pb-4 lg:pb-0">
      <ul className="flex flex-row lg:flex-col gap-2 h-full text-lg overflow-x-auto lg:overflow-visible">
        {navLinks.map((link) => (
          <li key={link.name} className="shrink-0">
            <a
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden sm:inline lg:inline">{link.name}</span>
            </a>
          </li>
        ))}

        <li className="ml-auto lg:ml-0 lg:mt-auto shrink-0 mt-1 lg:mt-0">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
