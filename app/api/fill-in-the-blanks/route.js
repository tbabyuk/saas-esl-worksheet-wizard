import OpenAI from "openai";
import { connectToESLWorksheetWizardDB } from "@/db/database";
import { NextResponse } from "next/server";
import { decrementUserApiCount } from "../utils/apiLimitActions";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';


const openai = new OpenAI();


export async function POST(req) {
    const requestObject = await req.json();
    const {type} = requestObject;
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



    if(type === "blanks-from-user-words") {

        const {wordsAsBlanksArray, text} = requestObject;

        console.log("logging wordsAsBlanksArray and text", wordsAsBlanksArray, text)

        const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a fill-in-the-blanks activity for my students. In this text: ${text}, please replace the words inside this array: ${wordsAsBlanksArray} with an underscore line, like this "________________", which should be 18 characters long. It's important that you only replace these words, and no other words. If any of these words are preceded by an article like "a" or "the", do not replace the article, only the word. The case of these words does not matter. Also, if the array contains a word that's not inside the text, just return the original text without any changes. Finally, please return the resulting result to me as a string. Thank you.`}],
        model: "gpt-3.5-turbo",
        });

        await decrementUserApiCount(userId);

        console.log("Logging APi response from fill in the blanks API:=====================", completion.choices[0].message)

        return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    } 


    // if(type === "blanks-from-part-of-speech") {
    //     const {partOfSpeechAsBlanks, text} = requestObject;
    //     console.log("from API: blanks from part of speech fired========= the part of speech is:", partOfSpeechAsBlanks)

    //     const completion = await openai.chat.completions.create({
    //     messages: [{"role": "user", "content": `Hey chat, I am an ESL English teacher and I need your help creating a fill-in-the-blanks activity for my students. Please replace all ${partOfSpeechAsBlanks} in the following text with a long underscore line, like this '________________'. Then, return the modified text as one single string inside an array. Please, please be sure to replace every single ${partOfSpeechAsBlanks}. Here is the text for you to work with: ${text}.`}],
    //     model: "gpt-3.5-turbo",  
    //     });

    //     await decrementUserApiCount(userId);

    //     return NextResponse.json({result: completion.choices[0].message}, {status: 200})
    // }


    } catch(error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}