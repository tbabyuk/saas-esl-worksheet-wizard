import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";



export const checkFreeTrialExists = async (userId) => {

        console.log("checkApiLimitReached function fired");
        await connectToESLWorksheetWizardDB();
    
        // check if current user exists in db
        const user = await User.findOne({ userClerkId: userId });
        if(user && user.userApiCount === 6) {
            console.log("no more free trial!");
            return false;
        } else {
            console.log("this user is still on the free trial");
            return true;
        }
}


export const decrementUserApiCount = async (userId) => {
        console.log("incrementUserApiCount function fired");
        await connectToESLWorksheetWizardDB();
        await User.findOneAndUpdate({ userClerkId: userId }, {$inc: {userApiCount: -1}});
}


// export const fetchUserApiCount = async () => {

//     // user_2hOsSoY8mMGoBBVQtt11T5Ne9ZI


//     // return 111;
//     try {
//         await connectToESLWorksheetWizardDB();

//         const targetUser = await User.findOne({ userClerkId: "user_2hOsSoY8mMGoBBVQtt11T5Ne9ZI" });
    
//         return targetUser.userApiCount;

//     } catch(error) {
//         return NextResponse.json({message: error.message})
//     }

// }