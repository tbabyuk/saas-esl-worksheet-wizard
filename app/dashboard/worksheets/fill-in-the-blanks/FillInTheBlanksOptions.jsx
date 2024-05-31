"use client";

import { useState } from "react";
import { TagsInput } from "../../components/TagsInput";


export const FillInTheBlanksOptions = ({setOutputWithBlanks}) => {

  const [exerciseType, setExerciseType] = useState("choose");
  const [userPayload, setUserPayload] = useState({
    type: "choose",
    text: "",
    partOfSpeechAsBlanks: "choose",
    userWordsAsBlanks: "choose"
  });





//   const parseString = (string) => {

//     console.log("from parseString, logging string", string, typeof string);

//     const parsedArray = JSON.parse(string);

//     setQuestionsArray(parsedArray);

//     console.log("Logging parsedString from MCOptions:", parsedArray, typeof parsedArray);

//   }


  const handleSubmitText = async (e) => {
    e.preventDefault();

    console.log("from submit, logging userPayload:", userPayload);
  

    try {
        const res = await fetch("/api/fill-in-the-blanks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPayload)
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
                <option value="choose" disabled>Choose your fill-in-the-blanks options:</option>
                <option value="text">Create fill-in-the-blanks activity based on text provided by me.</option>
            </select>
            {exerciseType === "text" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmitText}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Paste the text you would like to create a fill-in-the-blanks activity from:</span>
                        <textarea className="textarea textarea-bordered h-[200px]" placeholder="paste your text here" value={userPayload.text} onChange={(e) => setUserPayload({...userPayload, text: e.target.value})}></textarea>
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Choose how to create your blanks:</span>
                        <select className="select select-bordered w-full block mx-auto" value={userPayload.type} onChange={(e) => setUserPayload({...userPayload, type: e.target.value})} required>
                            <option value="choose" disabled>Choose:</option>
                            <option value="blanks-from-part-of-speech">Create blanks from a part of speech</option>
                            <option value="blanks-from-user-words">Create blanks from words chosen by me</option>
                        </select>
                    </label>
                    {userPayload.type === "blanks-from-part-of-speech" && (
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
                    )}
                    {userPayload.type === "blanks-from-user-words" && (
                        <label className="flex flex-col mb-8">
                            <span className="mb-2">Choose what words you would like displayed as blanks:</span>
                            {/* Textarea goes here */}
                            <TagsInput userPayload={userPayload} setUserPayload={setUserPayload} />
                        </label>
                    )}
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
        </div>
    </div>
  )
}