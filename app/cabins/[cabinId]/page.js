import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `cabin ${name}`,
  };
}

export async function generateStaticPrams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 lg:px-0">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-4 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival or online.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
