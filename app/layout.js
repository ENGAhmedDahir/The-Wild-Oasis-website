import Logo from "@/app/_components/Logo";
import { Navigation } from "@/app/_components/Navigation";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import ReservationContext from "./_components/ReservationContex";
import ReservationProvider from "./_components/ReservationContex";

import Footer from "./_components/Footer";

import { ThemeProvider } from "./_components/ThemeProvider";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider>
          <Header />
          <div className="flex-1 px-4 py-8 md:px-8 md:py-12 grid pt-32 md:pt-36">
            <main className="max-w-7xl mx-auto w-full">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
