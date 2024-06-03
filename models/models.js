import {Schema, model, models} from "mongoose"



const userSchema = new Schema({
    user_first_name: {
        type: String,
        required: true
    },
    user_last_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_clerk_id: {
        type: String,
        required: true
    },
    user_api_count: {
        type: Number,
        required: true
    }
}, {timestamps: true})



export const User = models.User || model("User", userSchema);