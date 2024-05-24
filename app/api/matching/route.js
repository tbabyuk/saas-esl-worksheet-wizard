
import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req) {
    const terms = await req.json();
    
    console.log("Logging terms from API:", terms);

    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a matching exercise for my students. Please generate for me the definitions for these terms: ${terms}. Then, please return both the terms and their corresponding definitions as a JSON object, where the terms are the keys and the definitions are the values. It's very important that you return only these keys and values in the JSON object and nothing else.`}],
        model: "gpt-3.5-turbo-16k",
    });
      
    console.log("logging openAI response from matching API:", completion.choices[0].message);



    return NextResponse.json({result: completion.choices[0].message})
}