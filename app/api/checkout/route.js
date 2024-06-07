import { NextResponse } from "next/server";

// import stripe
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const exampleItemsArray = [
{
    // live id
    id: "price_1POslpJNMVMwXzkxjpn3sWsy",
    title: "20 Credits",
    slug: "rcm-prep-b-sight-reading-ear-tests",
    author: "The Royal Conservatory",
    publisher: "RCM Publishing",
    description: "RCM Preparatory B Sight Reading and Ear Tests book",
    pages: "48",
    year: "2015",
    ISBN: "978-1-55440-741-5",
    price: 16.95,
    category: ["beginner", "ear tests", "four star", "rcm"],
    stock: "available",
    quantity: 1,
    source: "https://firebasestorage.googleapis.com/v0/b/dcam-website.appspot.com/o/shop_images%2Fbooks%2Frcm%2Fprepb_fourstar_2015.jpg?alt=media&token=7860d769-99a6-4f06-b906-2684a4dbda44"
},
]


export async function POST(request) {
    const { item } = await request.json();

    console.log("logging item to sell from API:", item)


    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: "price_1POslpJNMVMwXzkxjpn3sWsy",
            quantity: 20
        }],
        mode: "payment",
        // success_url: "/checkout/success",
        // cancel_url: "/checkout/cancel"
        success_url: "https://www.dacapomusic.ca/checkout/success",
        cancel_url: "https://www.dacapomusic.ca/checkout/cancel"

    }
  )
    if(session) {
        console.log("logging session:", session)
    }

        return NextResponse.json({
        url: session.url
    })
}



// import { NextResponse } from "next/server"

// // import stripe
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


// // test key


// export async function POST(request) {
//     const {items} = await request.json()

//     console.log("logging items from checkout API:", items)


//     let lineItems = [];

//     items.forEach((item) => {
//         lineItems.push(
//             {
//                 price: item.id,
//                 quantity: item.quantity,
//             }
//         )
//     })


//     const session = await stripe.checkout.sessions.create({
//         line_items: lineItems,
//         mode: "payment",
//         automatic_tax: {
//             enabled: true,
//         },
//         shipping_address_collection: {
//             allowed_countries: ["CA"],
//         },
//         // shipping_options: [
//         //     {
//         //         shipping_rate: "shr_1NsU8nBzVRorr5QY9hRRIQHs",
//         //     }
//         // ],
//         shipping_options: [
//             {
//                 shipping_rate_data: {
//                   type: 'fixed_amount',
//                   fixed_amount: {
//                     amount: 0,
//                     currency: 'cad',
//                   },
//                   display_name: 'Store pickup'
//                 },
//               },
//               {
//                 shipping_rate_data: {
//                   type: 'fixed_amount',
//                   fixed_amount: {
//                     amount: 1000,
//                     currency: 'cad',
//                   },
//                   display_name: 'Ground shipping (1-3 business days in GTA)',
//                   delivery_estimate: {
//                     minimum: {
//                       unit: 'business_day',
//                       value: 5,
//                     },
//                     maximum: {
//                       unit: 'business_day',
//                       value: 7,
//                     },
//                   },
//                 },
//               },
//         ],
//         success_url: "https://www.dacapomusic.ca/checkout/success",
//         cancel_url: "https://www.dacapomusic.ca/checkout/cancel"
//         // success_url: "http://localhost:3000/checkout/success",
//         // cancel_url: "http://localhost:3000/checkout/cancel"
//     })

//     if(session) {
//         console.log("logging session:", session)
//     }

//     return NextResponse.json({
//         url: session.url
//     })
// }
