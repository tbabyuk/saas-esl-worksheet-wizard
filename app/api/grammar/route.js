import OpenAI from "openai";
import { connectToESLWorksheetWizardDB } from "@/db/database";
import { NextResponse } from "next/server";
import { decrementUserApiCount } from "../utils/apiLimitActions";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';




const openai = new OpenAI();


export async function POST(req) {
    const requestObject = await req.json();
    const {grammarTopic, numSentences} = requestObject;
    const {userId} = auth();


    console.log("logging grammarTopic and numSentences from API:", grammarTopic, numSentences)


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
            messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a grammar worksheet for my students. Please generate for me ${numSentences} sentences where each sentence has a mistake with its ${grammarTopic}. Then, please return the result inside a single array, where each sentence is a string. Thank you.`}],
            model: "gpt-3.5-turbo",
        });

        await decrementUserApiCount(userId);

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}