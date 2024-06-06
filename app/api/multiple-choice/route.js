
import { NextResponse } from "next/server";
import { checkFreeTrialExists, incrementUserApiCount } from "../utils/apiLimitActions";


import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req) {
    const {text, userId} = await req.json();

    console.log("text from API:", text)

    try {

    const freeTrialExists = await checkFreeTrialExists(userId);

    if(!freeTrialExists) {
        return NextResponse.json({message: "free trial has expired!"}, {status: 403})
    }

    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating multiple choice questions for my students. Using the text below, please generate for me 5 different multiple choice questions. Please return them in JSON format as an array of objects. Each object should have a key of 'question' holding the question string and a second key of 'choices' holding an array of all the choices as strings. Here is the text for you: ${text}.`}],
        model: "gpt-3.5-turbo-16k",
    });

    await incrementUserApiCount(userId);

    console.log("Logging AI response from API:", completion.choices[0].message)

    return NextResponse.json({result: completion.choices[0].message}, {status: 200})

    } catch(error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}