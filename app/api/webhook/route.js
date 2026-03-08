// app/api/stripe/webhook/route.js

import { supabaseAdmin } from "@/app/_lib/supabaseAdmin";

export async function POST(req) {
  console.log("Stripe webhook hit");
  const body = await req.json();

  if (body.type === "checkout.session.completed") {
    const session = body.data.object;

    const booking = {
      guestId: Number(session.metadata.guestId),
      cabinId: Number(session.metadata.cabinId),
      startDate: session.metadata.startDate,
      endDate: session.metadata.endDate,
      numGuests: Number(session.metadata.numGuests),
      numNights: Number(session.metadata.numNights),
      cabinPrice: Number(session.metadata.cabinPrice),
      observations: session.metadata.observations,
      extrasPrice: 0,
      totalPrice: session.amount_total / 100,
      hasBreakfast: false,
      status: "unconfirmed",
      isPaid: true,
    };

    const { error } = await supabaseAdmin.from("bookings").insert([booking]);

    if (error) {
      console.error("Supabase Error Data:", error);
      return new Response("Database Error", { status: 500 });
    }
  }

  return new Response("ok");
}
