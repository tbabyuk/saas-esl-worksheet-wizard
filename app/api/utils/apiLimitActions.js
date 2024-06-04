import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";


export const checkFreeTrialExists = async (userId) => {

    console.log("checkApiLimitReached function fired");

    try {
        await connectToESLWorksheetWizardDB();
    
        // check if current user exists in db
        const user = await User.findOne({ userClerkId: userId });
    
        if(user && user.userApiCount === 8) {
            console.log("no more free trial!");
            return false;
        } else {
            console.log("this user is still on the free trial");
            await User.findOneAndUpdate({ userClerkId: userId }, {$inc: {userApiCount: 1}});
            return true;
        }
        } catch (error) {
            console.log("An error occurred:", error.message);
            return false;
        }
}


