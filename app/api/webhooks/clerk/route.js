import { NextResponse } from "next/server";
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";



export async function POST(req) {
    
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        // return new Response('Error occured -- no svix headers', {
        // status: 400
        // })
        return NextResponse.json({message: "An error occurred -- no svix headers"}, {status: 400})
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        // return new Response('Error occured', {
        // status: 400
        // })
        return NextResponse.json({message: "An error occurred"}, {status: 400})
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { first_name, last_name, email_addresses, id } = evt.data;
    const eventType = evt.type;


    // CREATE USER
    if(eventType === "user.created") {

        try {
            await connectToESLWorksheetWizardDB()

            // add new user to database
            await User.create({
                userFirstName: first_name,
                userLastName: last_name,
                userEmail: email_addresses[0].email_address,
                userClerkId: id,
                userApiCount: 0
            })
        
            // return new Response(JSON.stringify(result), {status: 200})
            return NextResponse.json({message: "User successfully created!"}, {status: 201})
    
        } catch (error) {
            // return new Response("Failed to fetch students", {status: 500})
            return NextResponse.json({message: error.message}, {status: 500})
        }
    }

    // UPDATE
    // if(eventType === "user.updated") {

    // }

    // DELETE
    // if(eventType === "user.deleted") {
    //     const {id} = evt.data;
    // }

    return NextResponse.json({message: "Success!"}, {status: 200})
}
