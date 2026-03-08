import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";
import FeaturedCabins from "./_components/FeaturedCabins";
import UpcomingEvents from "./_components/UpcomingEvents";
import Spinner from "./_components/Spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src={bg}
          fill
          quality={80}
          className="object-cover object-top"
          alt="Mountains and forests with two cabins"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-7xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to a Place of Peace
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-600 text-primary-800 hover:bg-accent-600 px-6 py-4 text-base md:px-8 md:py-6 md:text-lg font-semibold transition-all shadow-xl"
          >
            Explore luxury cabins
          </Link>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8">
        <Suspense fallback={<Spinner />}>
          <FeaturedCabins />
        </Suspense>

        <UpcomingEvents />
      </main>
    </div>
  );
}
