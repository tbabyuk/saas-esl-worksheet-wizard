import {Schema, model, models} from "mongoose"



const userSchema = new Schema({
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userClerkId: {
        type: String,
        required: true
    },
    userApiCount: {
        type: Number,
        required: true
    }
}, {timestamps: true})



export const User = models.User || model("User", userSchema);