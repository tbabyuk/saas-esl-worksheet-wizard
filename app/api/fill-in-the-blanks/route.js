
import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req) {
    const {text, blanksTarget} = await req.json();

    console.log("text and blanks target from API:", text, blanksTarget)

    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a fill-in-the-blanks activity for my students. In the text below, please replace all ${blanksTarget} with the a long underscore line, like this "________________" (16 characters long), and then return the resulting text to me as a string. Here is the text: ${text}.`}],
        model: "gpt-3.5-turbo-16k",
    });

    console.log("Logging AI response from API:", completion.choices[0].message)


    return NextResponse.json({result: completion.choices[0].message}, {status: 200})

    
    // return NextResponse.json({message: "success", status: 200})
}