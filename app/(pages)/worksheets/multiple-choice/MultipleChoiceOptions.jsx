"use client";

import { useState, useRef } from "react";
import { FreeTrialFinishedModal } from "@/app/components/FreeTrialFinishedModal";
import { OutOfCreditsModal } from "@/app/components/OutOfCreditsModal";
import { ErrorWarning } from "@/app/components/ErrorWarning";


export const MultipleChoiceOptions = ({setQuestionsArray}) => {

  const freeTrialFinishedModalRef = useRef();
  const outOfCreditsModalRef = useRef();

  const [exerciseType, setExerciseType] = useState("choose");
  const [userTextPayload, setUserTextPayload] = useState({
    text: ""
  });


  const parseString = (string) => {
    console.log("logging string from parseString:", string, typeof string)

    // captures only the string content inside [ ] brackets
    const objectRegex = /\[[^\[\]]*?(?:\[[^\[\]]*?\][^\[\]]*?)*\]/;
    
    const stringArray = string.match(objectRegex)[0];

    console.log("logging stringArray after regex", stringArray, typeof stringArray)

    const parsedArray = JSON.parse(stringArray);
    setQuestionsArray(parsedArray);
  }


  const handleSubmitUserText = async (e) => {
    e.preventDefault();

    console.log("from client handleSubmitText: fired", userTextPayload)

    try {
        setQuestionsArray([])
        const res = await fetch("/api/multiple-choice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTextPayload)
        });

        if(!res.ok) {
            const {message} = await res.json();
            if(message === "free trial expired") {
                console.log("Free trial has expired")
                freeTrialFinishedModalRef.current.showModal();
                return;
            }
            if(message === "out of credits") {
                console.log("The user is out of credits!")
                outOfCreditsModalRef.current.showModal();
                return;
            }
        }

        const {result} = await res.json();
        
        console.log("logging result.content from MC client:", result.content)

        parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error.message)
        }
  }


  return (
    <div className="w-full">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose your multiple choice worksheet options:</option>
                <option value="text">Create multiple choice questions based on text provided by me</option>
            </select>
            {exerciseType === "text" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmitUserText}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Paste the text you would like to create multiple choice questions from:</span>
                        <textarea 
                            className="textarea textarea-bordered h-[200px]" 
                            placeholder="paste your text here" 
                            value={userTextPayload.text}
                            onChange={(e) => setUserTextPayload((prev) => ({...prev, text: e.target.value}))}
                            required
                        />
                    </label>
                    <button className="btn action-btn text-white">Generate Worksheet</button>
                    <ErrorWarning />
                </form>
            )}
        </div>
        <FreeTrialFinishedModal freeTrialFinishedModalRef={freeTrialFinishedModalRef} />
        <OutOfCreditsModal outOfCreditsModalRef={outOfCreditsModalRef} />
    </div>
  )
}