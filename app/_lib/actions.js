"use server";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You Must be Loggin");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

// export async function createBooking(bookingData, formData) {
//   const session = await auth();
//   if (!session) throw new Error("You Must be Loggin");

//   const newBooking = {
//     ...bookingData,
//     guestId: session.user.guestId,
//     numGuests: Number(formData.get("numGuests")),
//     observations: formData.get("observations").slice(0, 1000),
//     extrasPrice: 0,
//     totalPrice: bookingData.cabinPrice,
//     isPaid: false,
//     hasBreakfast: false,
//     status: "unconfirmed",
//   };

//   const { error } = await supabase.from("bookings").insert([newBooking]);

//   if (error) throw new Error("Booking could not be created");

//   revalidatePath(`/cabins/${bookingData.cabinId}`);

//   redirect("/cabins/thankyou");
// }
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2026-02-25",
// });

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations")?.slice(0, 1000);

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Cabin Booking",
          },
          unit_amount: bookingData.cabinPrice * 100,
        },
        quantity: 1,
      },
    ],
    customer_email: session.user?.email,
    metadata: {
      guestId: String(session.user.guestId),
      cabinId: String(bookingData.cabinId),
      startDate: new Date(bookingData.startDate).toISOString(),
      endDate: new Date(bookingData.endDate).toISOString(),
      numGuests: String(numGuests),
      observations: observations || "",
      cabinPrice: String(bookingData.cabinPrice),
      numNights: String(bookingData.numNights),
    },

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cabins/thankyou`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cabins/${bookingData.cabinId}`,
  });

  redirect(checkoutSession.url);
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You Must be Loggin");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
