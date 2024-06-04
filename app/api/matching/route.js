import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkFreeTrialExists } from "../utils/apiLimitActions";


const openai = new OpenAI();


export async function POST(req) {
    const requestObject = await req.json();
    const {action, userId} = requestObject;


    const freeTrialExists = await checkFreeTrialExists(userId);

    if(!freeTrialExists) {
        return NextResponse.json({message: "free trial no longer exists!"}, {status: 403})
    }

    if (action === "action1") {
        const {termsList} = requestObject;

        const completion = await openai.chat.completions.create({
            messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a matching exercise for my students. Please generate for me the definitions for these terms: ${termsList}. Please keep the definitions to under 23 words. Then, please return both the terms and their corresponding definitions as a JSON object, where the terms are the keys and the definitions are the values. It's very important that you return only these keys and values in the JSON object and nothing else.`}],
            model: "gpt-3.5-turbo-16k",
        });

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    }

    if (action === "action2") {
        const {topic, numTerms} = requestObject;
        console.log("logging topic and numTerms from action 2 in API:", topic, numTerms)

        const completion = await openai.chat.completions.create({
            messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a matching exercise for my students. Please generate for me ${numTerms} different terms and definitions on the topic of ${topic}. Please keep the definitions to under 23 words. Then, please return both the terms and their corresponding definitions as a JSON object, where the terms are the keys and the definitions are the values. It's very important that you return only these keys and values in the JSON object and nothing else.`}],
            model: "gpt-3.5-turbo-16k",
        });

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    }

    
    return NextResponse.json({message: "unknown action", status: 400})
}