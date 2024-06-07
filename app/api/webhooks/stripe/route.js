import { NextResponse } from 'next/server';
import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";



export async function POST(req) {
    const {type} = await req.json();
    console.log("logging evt from Stripe Webhook:", type)


        // CREATE USER
        if(type === "charge.succeeded") {

            try {
                await connectToESLWorksheetWizardDB()
    
                // add new user to database
                await User.updateOne({ userEmail: "terry@strictlywebdev.com"}, {userApiCount: 20})
            
                // return new Response(JSON.stringify(result), {status: 200})
                console.log("credits update successful!")
                return NextResponse.json({message: "Update Successful!"}, {status: 200})
        
            } catch (error) {
                // return new Response("Failed to fetch students", {status: 500})
                return NextResponse.json({message: error.message}, {status: 500})
            }
        }
    


    return NextResponse.json({message: "success"})
}






// // This example uses Express to receive webhooks
// const express = require('express');
// const app = express();

// // Match the raw body to content type application/json
// // If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
// app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
//   const event = request.body;

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({received: true});
// });

// app.listen(8000, () => console.log('Running on port 8000'));
