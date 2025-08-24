import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json(session);
  } catch (err: any) {
    console.error("Error fetching session:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch session" },
      { status: 500 }
    );
  }
}
