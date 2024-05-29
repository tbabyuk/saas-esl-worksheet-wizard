"use client";

import { useState } from "react";


export const MultipleChoiceOptions = ({setQuestionsArray}) => {

  const [exerciseType, setExerciseType] = useState("choose");
  const [userPayload, setUserPayload] = useState({
    name: "Bob",
    text: "bsldfjsldkfjlkj"
  });

  console.log("logging userPayload:", userPayload)



  const parseString = (string) => {

    console.log("from parseString, logging string", string, typeof string);

    const parsedArray = JSON.parse(string);

    setQuestionsArray(parsedArray);

    console.log("Logging parsedString from MCOptions:", parsedArray, typeof parsedArray);

  }


  const handleSubmitText = async (e) => {
    e.preventDefault();

    console.log("from client handleSubmitText: fired", userPayload)

    try {
        const res = await fetch("/api/multiple-choice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userPayload)
        });

        
        const {result} = await res.json();
        
        console.log("logging result from client:", result)

        parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error.message)
        }
  }


  return (
    <div className="w-full">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose your multiple choice options:</option>
                <option value="text">Create multiple choice questions based on text provided by me.</option>
            </select>
            {exerciseType === "text" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmitText}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Paste the text you would like to create multiple choice questions from:</span>
                        <textarea className="textarea textarea-bordered" placeholder="paste your text here" value={userPayload.text} onChange={(e) => setUserPayload({...userPayload, text: e.target.value})}></textarea>
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
        </div>
    </div>
  )
}