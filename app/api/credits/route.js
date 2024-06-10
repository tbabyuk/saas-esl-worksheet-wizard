import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";


export async function GET() {

    console.log("CREDITS API HIT=================")
    const {userId} = auth();

    console.log("logging userId from CREDITS API:", userId)

    try {
        await connectToESLWorksheetWizardDB();

        const user = await User.findOne({ userClerkId: userId });

        if(!user) {
            return NextResponse.json({message: "User not found!"}, {status: 404});
        }

        console.log("Logging user API count from credits APi route:", user.userApiCount)
        return NextResponse.json({result: user.userApiCount})

    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }

}