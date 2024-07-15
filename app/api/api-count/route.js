import { connectToESLWorksheetWizardDB } from "@/db/database";
import { NextResponse } from "next/server";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';


export async function POST(req) {

    const {greeting} = await req.json();
    const {userId} = auth();

    console.log("logging greeting from server:", greeting, userId)

    try {
        await connectToESLWorksheetWizardDB();
        const {userApiCount} = await User.findOne({ userClerkId: userId });
        return NextResponse.json({currentUserApiCount: userApiCount}, {status: 200})

    } catch(error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}