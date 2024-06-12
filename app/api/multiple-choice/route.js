import OpenAI from "openai";
import { connectToESLWorksheetWizardDB } from "@/db/database";
import { NextResponse } from "next/server";
import { decrementUserApiCount } from "../utils/apiLimitActions";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';



const openai = new OpenAI();


export async function POST(req) {

    const {text} = await req.json();
    const {userId} = auth();


    console.log("Loggin text from MC API:", text)


    try {

        await connectToESLWorksheetWizardDB();
    
        const user = await User.findOne({ userClerkId: userId });

        if(!user) {
            return NextResponse.json({message: "User not found!"}, {status: 404});
        }

        // check if current user is still on the free trial
        if(user.userIsOnFreeTrial && user.userApiCount === 0) {
            await User.findOneAndUpdate({ userClerkId: userId }, {userIsOnFreeTrial: false});
            return NextResponse.json({message: "free trial expired"}, {status: 403});
        }

        // if user is no longer on free trial, check their ApiCount
        if(!user.userIsOnFreeTrial && user.userApiCount === 0) {
            return NextResponse.json({message: "out of credits"}, {status: 403})
        }

        const completion = await openai.chat.completions.create({
            messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating multiple choice questions for my students. Using the text below, please generate for me 5 different multiple choice questions. Please return them in JSON format as an array of objects. Each object should have a key of 'question' containing the question string and a second key of 'choices' holding an array of all the choices as strings. Here is the text for you: ${text}.`}],
            model: "gpt-3.5-turbo-16k",
        });

        await decrementUserApiCount(userId);

        console.log("Logging AI response from API:", completion.choices[0].message)

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})

        } catch(error) {
            return NextResponse.json({message: error.message}, {status: 500})
        }
}