import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(request) {

    const messages = await request.json()


        console.log("logging messages from API:", messages);

        const completion = await openai.chat.completions.create({
        //   messages,
        messages,
          model: "gpt-3.5-turbo-16k",
        });
      
        console.log(completion.choices[0].message);
    //   }

    //   makeCall()

    return NextResponse.json(completion.choices[0].message);
}
