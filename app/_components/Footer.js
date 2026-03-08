import Link from "next/link";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="border-t border-primary-900 bg-primary-950 mt-auto py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
        
        {/* Branding & Logo */}
        <div className="flex flex-col gap-4 max-w-xs">
          <Logo />
          <p className="text-primary-300 text-sm leading-relaxed mt-2">
            A luxurious cabin hotel in the heart of the Italian Dolomites. Experience nature&apos;s beauty in your own private sanctuary.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary-100 font-semibold text-lg">Explore</h4>
          <ul className="flex flex-col gap-3 text-primary-300">
            <li>
              <Link href="/cabins" className="hover:text-accent-400 transition-colors">Our Cabins</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent-400 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-accent-400 transition-colors">Guest Area</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary-100 font-semibold text-lg">Contact</h4>
          <address className="not-italic text-primary-300 flex flex-col gap-3 text-sm">
            <p>123 Mountain View Road<br />Dolomites, Italy 39046</p>
            <p className="mt-2">
              <a href="tel:+390471123456" className="hover:text-accent-400 transition-colors">+39 0471 123456</a><br />
              <a href="mailto:hello@thewildoasis.com" className="hover:text-accent-400 transition-colors">hello@thewildoasis.com</a>
            </p>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-primary-900 mt-12 pt-8 text-center text-primary-400 text-sm">
        <p>&copy; {new Date().getFullYear()} The Wild Oasis. All rights reserved.</p>
        <p className="mt-2 text-xs">A demonstration project.</p>
      </div>
    </footer>
  );
}

export default Footer;
