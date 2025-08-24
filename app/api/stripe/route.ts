import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const headersList = await headers();
    const origin =
      headersList.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1RzKg6AuOKBkwb430QDMpPZB" },
        { shipping_rate: "shr_1RzKgtAuOKBkwb43SKIlJkZc" },
      ],
      line_items: body.cartItems.map(
        (item: CartItem): Stripe.Checkout.SessionCreateParams.LineItem => {
          return {
            price_data: {
              currency: "usd", // change if needed
              product_data: {
                name: item.name,
                images: item.images,
              },
              unit_amount: item.price * 100, // Stripe expects cents
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }
      ),
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    };

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);
    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session could not be created" },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
