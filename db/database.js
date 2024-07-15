import mongoose from "mongoose";
import {connect} from "mongoose";



let isConnected = false;


export const connectToESLWorksheetWizardDB = async () => {
    mongoose.set("strictQuery", true);

    console.log("connectToESLWorksheetWizard Ran +++++++++++++++++++++++++++++++++++=")

    if(isConnected) {
        console.log("MongoDB is already connected")
        return
    }

    try {
        await connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log("Connection established to esl_worksheet_wizard collection")
    } catch (error) {
        console.log("Error connecting to mongoDB:", error)
    }
}