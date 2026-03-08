import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col lg:flex-row border border-primary-800">
      <div className="relative h-48 lg:h-32 w-full lg:w-32 shrink-0">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-b lg:border-b-0 lg:border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-4 lg:py-3 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center justify-center md:justify-start rounded-sm shrink-0">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center justify-center md:justify-start rounded-sm shrink-0">
              upcoming
            </span>
          )}
        </div>

        <p className="text-base md:text-lg text-primary-300 mt-2 md:mt-0">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap gap-3 md:gap-5 mt-4 lg:mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="hidden md:block text-primary-300">&bull;</p>
          <p className="text-base md:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="w-full md:w-auto md:ml-auto text-sm text-primary-400 mt-2 md:mt-0">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col border-t lg:border-t-0 lg:border-l border-primary-800 lg:w-[130px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex flex-1 justify-center lg:justify-start items-center gap-2 uppercase text-xs font-bold text-primary-300 border-r lg:border-r-0 lg:border-b border-primary-800 px-3 py-4 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>

            <div className="flex-1">
              <DeleteReservation bookingId={id} onDelete={onDelete} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
