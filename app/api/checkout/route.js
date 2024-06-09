import { NextResponse } from "next/server";
// import { getAuth } from '@clerk/nextjs/server';
import Stripe from "stripe";
import { auth } from '@clerk/nextjs/server';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {

    const { numberOfCredits } = await request.json();
    const {userId} = auth();


    console.log("logging item to sell from API:", numberOfCredits)
    console.log("Logging current user from Checkout API:", userId)


    let price;
    let quantity;

    switch(numberOfCredits) {
        case 20:
            price = "price_1POslpJNMVMwXzkxjpn3sWsy";
            quantity = 20;
            break;

        case 50:
            price = "price_1POsmkJNMVMwXzkxa9X8xUQx";
            quantity = 50;
            break;

        case 100:
            price = "price_1POsn8JNMVMwXzkxWkoA62Pv";
            quantity = 100;
            break;

        default:
            return NextResponse.json({error: "product not found"}, {status: 400})
    }


    try {
        const session = await stripe.checkout.sessions.create({

            line_items: [{
                price,
                quantity
            }],
            payment_intent_data: {
                metadata: {
                    userClerkId: userId,
                    name: "Sally"
                },
            },
            mode: "payment",
            success_url: "https://www.dacapomusic.ca/checkout/success",
            cancel_url: "https://www.dacapomusic.ca/checkout/cancel"

            }
        )

        // if(session) {
        //     console.log("logging session:", session)
        // }

        return NextResponse.json({url: session.url})

    } catch(error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}



