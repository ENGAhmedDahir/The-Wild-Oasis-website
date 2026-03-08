import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

async function FeaturedCabins() {
  const cabins = await getCabins();
  
  // Pick 3 cabins to feature (e.g., the first 3, or sort by capacity)
  const featuredCabins = cabins.slice(0, 3);

  return (
    <section className="mb-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 md:gap-0">
        <div>
          <h2 className="text-4xl text-accent-400 font-medium mb-3">
            Featured Cabins
          </h2>
          <p className="text-primary-200 text-lg">
            A handpicked selection of our most loved mountain retreats.
          </p>
        </div>
        <Link
          href="/cabins"
          className="text-accent-500 font-semibold hover:text-accent-400 transition-colors flex items-center gap-2 text-lg"
        >
          View all cabins &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {featuredCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCabins;
