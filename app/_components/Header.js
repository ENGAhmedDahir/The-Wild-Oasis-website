import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import HeaderBackground from "./HeaderBackground";
import ThemeToggle from "./ThemeToggle";
import MobileNavigationToggle from "./MobileNavigationToggle";

function Header() {
  return (
    <HeaderBackground>
      <div className="flex justify-between items-center max-w-7xl mx-auto relative">
        <Logo />
        <div className="flex items-center gap-4 md:gap-8">
          <MobileNavigationToggle>
            <Navigation />
          </MobileNavigationToggle>
          <ThemeToggle />
        </div>
      </div>
    </HeaderBackground>
  );
}

export default Header;
