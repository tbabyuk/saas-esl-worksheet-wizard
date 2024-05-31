
import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req) {
    const requestObject = await req.json();
    const {type} = requestObject;


    if(type === "blanks-from-part-of-speech") {
        const {partOfSpeechAsBlanks, text} = requestObject;
        console.log("from API: blanks from part of speech fired=========")

        const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a fill-in-the-blanks activity for my students. In the text below, please replace all ${partOfSpeechAsBlanks} with a long underscore line, like this "________________" (16 characters long), and then return the resulting text to me as a string. Here is the text: ${text}.`}],
        model: "gpt-3.5-turbo-16k",
        });

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    }


    if(type === "blanks-from-user-words") {
        const {userWordsAsBlanks, text} = requestObject;
        console.log("from API: blanks from words fired===========")

        const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I need your help creating a fill-in-the-blanks activity for my students. In this text: ${text}, please replace the words ["time", "grass", "bella"] with a long underscore line, like this "________________" (maximum 16 characters long). It's important that you only replace these words, and no other words. If any of these words are preceded by an article like "a" or "the", do not replace the article, only the word. The case of these words does not matter. Finally, please return the resulting text to me as a string. Thank you.`}],
        model: "gpt-3.5-turbo-16k",
        });
    
        return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    }




    // console.log("================ from API, TYPE:", type)

    // const completion = await openai.chat.completions.create({
    //     messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a fill-in-the-blanks activity for my students. In the text below, please replace all ${partOfSpeechAsBlanks} with the a long underscore line, like this "________________" (16 characters long), and then return the resulting text to me as a string. Here is the text: ${text}.`}],
    //     model: "gpt-3.5-turbo-16k",
    // });

    // console.log("Logging AI response from API:", completion.choices[0].message)


    // return NextResponse.json({result: completion.choices[0].message}, {status: 200})

    
    return NextResponse.json({message: "success", status: 200})
}