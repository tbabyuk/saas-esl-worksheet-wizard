"use client";

import { useState } from "react";
import { TargetWordsInput } from "../multiple-choice/components/TargetWordsInput";
import { useUser } from "@clerk/nextjs";
import { ErrorWarning } from "@/app/components/ErrorWarning";
import { BlanksTargetWordsInput } from "./components/BlanksTargetWordsInput";



export const FillInTheBlanksOptions = ({setOutputWithBlanks}) => {

  const {user} = useUser();
  const [exerciseType, setExerciseType] = useState("choose");
  const [userPayload, setUserPayload] = useState({
    type: "choose",
    text: "",
    partOfSpeechAsBlanks: "choose",
    userWordsAsBlanksArray: []
  });
  const [blanksMethodError, setBlanksMethodError] = useState("");
  const [blanksTermsError, setBlanksTermsError] = useState("");


  console.log("Logging userPayload:", userPayload)





//   const parseString = (string) => {

//     console.log("from parseString, logging string", string, typeof string);

//     const parsedArray = JSON.parse(string);

//     setQuestionsArray(parsedArray);

//     console.log("Logging parsedString from MCOptions:", parsedArray, typeof parsedArray);

//   }

  const handleBlanksOptions = (e) => {
    setBlanksMethodError("");
    setUserPayload((prev) => ({...prev, type: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(userPayload.type === "choose") {
        setBlanksMethodError("please indicate how blanks should be created")
        return;
    }

    if(userPayload.userWordsAsBlanksArray.length === 0) {
        setBlanksTermsError("you must enter at least one term before submitting")
        return;
    }

  
    try {

        const userPayloadWithUserId = {
            ...userPayload,
            userId: user.id
        }

        const res = await fetch("/api/fill-in-the-blanks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPayloadWithUserId)
        });

        
        const {result} = await res.json();
        
        console.log("logging result from client:", result)

        // parseString(result.content);
        setOutputWithBlanks(result.content)

        } catch(error) {
            console.log("An error occured:", error.message)
        }
  }


  return (
    <div className="w-full">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose your fill-in-the-blanks worksheet options:</option>
                <option value="text">Create a fill-in-the-blanks worksheet based on text provided by me</option>
            </select>
            {exerciseType === "text" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmit}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Paste the text you would like to create a fill-in-the-blanks worksheet from:</span>
                        <textarea 
                            className="textarea textarea-bordered h-[200px]" 
                            placeholder="paste your text here" 
                            value={userPayload.text} 
                            onChange={(e) => setUserPayload({...userPayload, text: e.target.value})}
                            required
                        />
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Choose how to create your blanks:</span>
                        <select 
                            className="select select-bordered w-full block mx-auto" 
                            value={userPayload.type} 
                            onChange={(e) => handleBlanksOptions(e)}
                            required
                        >
                            <option value="choose" disabled>Choose:</option>
                            {/* <option value="blanks-from-part-of-speech">Create blanks from a part of speech</option> */}
                            <option value="blanks-from-user-words">Create blanks from words chosen by me</option>
                        </select>
                        {blanksMethodError && (
                            <p className="text-sm text-red-500 px-2 mt-1">{blanksMethodError}</p>
                        )}
                    </label>
                    {/* {userPayload.type === "blanks-from-part-of-speech" && (
                        <label className="flex flex-col mb-8">
                            <span className="mb-2">Choose part of speech to create blanks from:</span>
                            <select className="select select-bordered w-full block mx-auto mb-8" value={userPayload.partOfSpeechAsBlanks} onChange={(e) => setUserPayload({...userPayload, partOfSpeechAsBlanks: e.target.value})}>
                                <option value="choose" disabled>Choose:</option>
                                <option value="nouns">Nouns</option>
                                <option value="verbs">Verbs</option>
                                <option value="adjectives">Adjectives</option>
                                <option value="adverbs">Adverbs</option>
                            </select>
                        </label>
                    )} */}
                    {userPayload.type === "blanks-from-user-words" && (
                        <label className="flex flex-col mb-8">
                            <span className="mb-2">Choose what words you would like displayed as blanks:</span>
                            {/* <TargetWordsInput userPayload={userPayload} setUserPayload={setUserPayload} /> */}
                            <BlanksTargetWordsInput userPayload={userPayload} setUserPayload={setUserPayload} blanksTermsError={blanksTermsError} setBlanksTermsError={setBlanksTermsError} />
                        </label>
                    )}
                    <button className="btn action-btn text-white">Generate Worksheet</button>
                    <ErrorWarning />
                </form>
            )}
        </div>
    </div>
  )
}