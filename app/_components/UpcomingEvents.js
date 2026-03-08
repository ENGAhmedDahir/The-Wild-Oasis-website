import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";

// Dummy data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Guided Mountain Stargazing",
    date: "October 15, 2026",
    location: "Dolomites Observatory Area",
    description:
      "Join our expert guides for an unforgettable night under the pristine alpine sky. Telescopes and hot cocoa provided.",
    image: "/about-2.jpg", // Reusing existing image as placeholder
  },
  {
    id: 2,
    title: "Wilderness Foraging & Cooking class",
    date: "October 18, 2026",
    location: "Oasis Main Lodge",
    description:
      "Learn to identify local edible plants and mushrooms, followed by a culinary masterclass using your freshly foraged ingredients.",
    image: "/about-1.jpg", // Reusing existing image as placeholder
  },
  {
    id: 3,
    title: "Sunrise Yoga Retreat",
    date: "October 22, 2026",
    location: "High Altitude Deck",
    description:
      "Start your morning with a rejuvenating yoga session surrounded by breathtaking mountain peaks and crisp morning air.",
    image: "/bg.png", // Reusing existing image as placeholder
  },
];

function UpcomingEvents() {
  return (
    <section className="mb-24">
      <h2 className="text-4xl text-accent-400 font-medium mb-10 text-center">
        Upcoming Oasis Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="flex flex-col border border-primary-800 bg-primary-950 overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-primary-100 mb-4">
                {event.title}
              </h3>

              <div className="flex items-center gap-3 text-primary-300 mb-2">
                <CalendarDaysIcon className="h-5 w-5 text-primary-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-300 mb-6">
                <MapPinIcon className="h-5 w-5 text-primary-600" />
                <span>{event.location}</span>
              </div>

              <p className="text-primary-200 mb-8 flex-grow">
                {event.description}
              </p>

              <Link
                href="/cabins"
                className="text-accent-500 font-semibold hover:text-accent-400 transition-colors self-start mt-auto flex items-center gap-2"
              >
                Book your stay to join &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingEvents;
