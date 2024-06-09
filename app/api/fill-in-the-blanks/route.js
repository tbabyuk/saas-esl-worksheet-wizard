
import { NextResponse } from "next/server";
import { checkFreeTrialExists, decrementUserApiCount } from "../utils/apiLimitActions";


import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req) {
    const requestObject = await req.json();
    const {type, userId} = requestObject;


    try {

    const freeTrialExists = await checkFreeTrialExists(userId);

    if(!freeTrialExists) {
        return NextResponse.json({message: "free trial has expired!"}, {status: 403})
    }


    if(type === "blanks-from-part-of-speech") {
        const {partOfSpeechAsBlanks, text} = requestObject;
        console.log("from API: blanks from part of speech fired=========")

        const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a fill-in-the-blanks activity for my students. In the text below, please replace all ${partOfSpeechAsBlanks} with a long underscore line, like this "________________" (16 characters long), and then return the resulting text to me as a string. Here is the text: ${text}.`}],
        model: "gpt-3.5-turbo-16k",
        });

        await decrementUserApiCount(userId);

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    }


    if(type === "blanks-from-user-words") {
        const {userWordsAsBlanksArray, text} = requestObject;

        console.log("logging user words as blanks array from API:", userWordsAsBlanksArray)

        const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I need your help creating a fill-in-the-blanks activity for my students. In this text: ${text}, please replace the words ${userWordsAsBlanksArray} with a long underscore line, like this "________________" (maximum 16 characters long). It's important that you only replace these words, and no other words. If any of these words are preceded by an article like "a" or "the", do not replace the article, only the word. The case of these words does not matter. Finally, please return the resulting text to me as a string. Thank you.`}],
        model: "gpt-3.5-turbo-16k",
        });

        await decrementUserApiCount(userId);
    
        return NextResponse.json({result: completion.choices[0].message}, {status: 200})

        } 

    } catch(error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}