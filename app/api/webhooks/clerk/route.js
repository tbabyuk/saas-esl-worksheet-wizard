
import { NextResponse } from "next/server";



export async function POST(req) {
    
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if(!webhookSecret) {
        return NextResponse.json({message: "webhook secret is missing", status: 400})
    }

    const payload = await req.json();


    return NextResponse.json({message: payload, status: 200})
}
