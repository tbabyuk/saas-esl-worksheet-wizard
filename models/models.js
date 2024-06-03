import {Schema, model, models} from "mongoose"



const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    apiCount: {
        type: Number,
        required: true
    }
}, {timestamps: true})



export const User = models.User || model("User", userSchema);