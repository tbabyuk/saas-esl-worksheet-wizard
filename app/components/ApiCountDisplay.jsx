import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic'


const getApiCount = async () => {

    const {userId} = auth();


    console.log("Logging userId from ApiCountDisplay:", userId)

    try {
        await connectToESLWorksheetWizardDB();
        const user = await User.findOne({ userClerkId: userId });
        console.log("logging user from ApiCountDisplay:", user)
        return user.userApiCount;
    } catch (error) {
        console.log("An error occured:", error)
    }
}


export const ApiCountDisplay = async () => {

    const count = await getApiCount()

    return (
        <p className="text-lg text-center py-2 bg-emerald-500/10">Your credit balance: &nbsp;&nbsp; <span className="font-bold text-gray-600">{count} {count === 1 ? "credit" : "credits"}</span></p>
    )
  }