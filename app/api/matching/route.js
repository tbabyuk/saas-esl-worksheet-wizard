import OpenAI from "openai";
import { connectToESLWorksheetWizardDB } from "@/db/database";
import { NextResponse } from "next/server";
import { decrementUserApiCount } from "../utils/apiLimitActions";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';


const openai = new OpenAI();


export async function POST(req) {
    const requestObject = await req.json();
    const {action} = requestObject;
    const {userId} = auth();


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
        
        if (action === "terms") {
            const {termsArray} = requestObject;

            const completion = await openai.chat.completions.create({
                messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a matching exercise for my students. Please generate for me the definitions for these terms: ${termsArray}. Please keep the definitions to under 20 words. Then, please return both the terms and their corresponding definitions as a JSON object, where the terms are the keys and the definitions are the values. It's very important that you return only these keys and values in the JSON object and nothing else.`}],
                model: "gpt-3.5-turbo",
            });

            await decrementUserApiCount(userId);

            return NextResponse.json({result: completion.choices[0].message}, {status: 200})
        }

        if (action === "topic") {
            const {topic, numTerms} = requestObject;

            const completion = await openai.chat.completions.create({
                messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a matching exercise for my students. Please generate for me ${+numTerms} different terms and their corresponding definitions on the topic of ${topic}. Please do not number the terms and keep each definition under 20 words. Then, please return both the terms and their corresponding definitions as a JSON object, where the keys are the terms and the values are the definitions. It's very important that you return only the keys and values in the JSON object and nothing else.`}],
                model: "gpt-3.5-turbo",
            });

            await decrementUserApiCount(userId);

            return NextResponse.json({result: completion.choices[0].message}, {status: 200})
        }

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}