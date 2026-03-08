import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-base md:text-xl w-full md:w-auto">
      <ul className="flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-16 items-start md:items-center">
        <li className="w-full md:w-auto">
          <Link href="/" className="hover:text-accent-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              {/* <div className="relative h-8">
                <Image
                  fill
                  className="h-8 rounded-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div> */}

              <span>{session.user?.name}</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="inline-flex items-center justify-center px-5 py-2.5 
  bg-accent-500 text-white font-medium rounded-lg 
  shadow-sm hover:bg-accent-600 
  hover:shadow-md hover:-translate-y-0.5
  transition-all duration-200"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
