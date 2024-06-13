"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { FreeTrialFinishedModal } from "@/app/components/FreeTrialFinishedModal";
import { OutOfCreditsModal } from "@/app/components/OutOfCreditsModal";


export const MultipleChoiceOptions = ({setQuestionsArray}) => {

  const {user} = useUser();

  const freeTrialFinishedModalRef = useRef();
  const outOfCreditsModalRef = useRef();

  const [exerciseType, setExerciseType] = useState("choose");
  const [userPayload, setUserPayload] = useState({
    text: ""
  });

  console.log("logging userPayload:", userPayload)



  const parseString = (string) => {

    console.log("from parseString, logging string", string, typeof string);

    // const arrayRegex = "\[(.*?)\]"

    // const stringArray = string.match(arrayRegex)[0];

    // console.log("logging stringArray from MCChoiceOptions:", stringArray)

    const parsedArray = JSON.parse(string);
    console.log("Logging parsedString from MCOptions:", parsedArray, typeof parsedArray);

    setQuestionsArray(parsedArray);


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

        if(!res.ok) {
            const {message} = await res.json();
            if(message === "free trial expired") {
                console.log("Free trial has expired")
                freeTrialFinishedModalRef.current.showModal();
            }
            if(message === "out of credits") {
                console.log("The user is out of credits!")
                outOfCreditsModalRef.current.showModal();
            }
        }

        
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
                <option value="choose" disabled>Choose your multiple choice worksheet options:</option>
                <option value="text">Create multiple choice questions based on text provided by me.</option>
            </select>
            {exerciseType === "text" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmitText}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Paste the text you would like to create multiple choice questions from:</span>
                        <textarea className="textarea textarea-bordered h-[200px]" placeholder="paste your text here" value={userPayload.text} onChange={(e) => setUserPayload({...userPayload, text: e.target.value})}></textarea>
                    </label>
                    <button className="btn action-btn text-white">Generate Worksheet</button>
                </form>
            )}
        </div>
        <FreeTrialFinishedModal freeTrialFinishedModalRef={freeTrialFinishedModalRef} />
        <OutOfCreditsModal outOfCreditsModalRef={outOfCreditsModalRef} />
    </div>
  )
}