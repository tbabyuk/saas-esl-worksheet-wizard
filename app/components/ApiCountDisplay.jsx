import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic'


const getApiCount = async () => {

    const {userId} = auth();

    try {
        await connectToESLWorksheetWizardDB();
        const user = await User.findOne({ userClerkId: userId });
        return user.userApiCount;
    } catch (error) {
        console.log(error)
    }
}


export const ApiCountDisplay = async () => {

    const count = await getApiCount()

    return (
        <p className="text-lg text-center py-2 bg-emerald-500/10">Your credit balance: &nbsp;&nbsp; <span className="font-bold">{count} {count === 1 ? "credit" : "credits"}</span></p>
    )
  }