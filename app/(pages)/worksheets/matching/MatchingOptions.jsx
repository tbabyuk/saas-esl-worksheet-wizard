"use client";

import { useState, useRef } from "react";
import { FreeTrialFinishedModal } from "@/app/components/FreeTrialFinishedModal";
import { OutOfCreditsModal } from "@/app/components/OutOfCreditsModal";
import { MatchingTargetWordsInput } from "./components/MatchingTargetWordsInput";
import { ErrorWarning } from "@/app/components/ErrorWarning";

export const MatchingOptions = ({setObjectKeys, setObjectValues}) => {

  const freeTrialFinishedModalRef = useRef();
  const outOfCreditsModalRef = useRef();

  // component state variables 
  const [exerciseType, setExerciseType] = useState("choose");
  const [userTermsPayload, setUserTermsPayload] = useState({
    action: "terms",
    termsArray: []
  });
  const [userTopicPayload, setUserTopicPayload] = useState({
    action: "topic",
    topic: "",
    numTerms: ""
  });
  const [inputError, setInputError] = useState("");



  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  const parseString = (string) => {

    console.log("from parseString, logging string", string, typeof string)

    const objectRegex = /{[^{}]+}/;

    const stringObject = string.match(objectRegex)[0];

    const parsedObject = JSON.parse(stringObject);

    console.log("logging parsed String from MatchingOptions:", parsedObject)
    
    const keys = Object.keys(parsedObject);

    setObjectKeys(Object.keys(parsedObject));
    console.log("Logging keys from result:", keys)

    const values = Object.values(parsedObject);
    setObjectValues(shuffleArray(values))
    console.log("Logging values from result:", values)
  }


  const handleNumTerms = (e) => {
    const userInput = e.target.value;
    if(userInput > 10) {
        setUserTopicPayload((prev) => ({...prev, numTerms: 10}))
    } else {
        setUserTopicPayload((prev) => ({...prev, numTerms: e.target.value}))
    }
  }


  const handleSubmitUserTerms = async (e) => {
    e.preventDefault();

    if(userTermsPayload.termsArray.length === 0) {
        setInputError("you must enter at least one term before submitting")
        return;
    }

    try {
        setObjectKeys([])
        setObjectValues([])
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTermsPayload)
        })

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
        console.log("Logging result.content from matching client: -------------", result.content)

        parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error)
        }
  }


  const handleSubmitUserTopic = async (e) => {
    e.preventDefault();

    try {
        setObjectKeys([])
        setObjectValues([])
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTopicPayload)
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
        parseString(result.content);

    } catch(error) {
        console.log("An error occured:", error)
    }
  }


  return (
    <div className="w-full">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose your matching worksheet options:</option>
                <option value="user-terms">Create a matching worksheet from terms provided by me</option>
                <option value="user-topic">Have AI create both terms and their meanings based on a topic</option>
            </select>
            {exerciseType === "user-terms" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmitUserTerms}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <MatchingTargetWordsInput userTermsPayload={userTermsPayload} setUserTermsPayload={setUserTermsPayload} inputError={inputError} setInputError={setInputError} />
                    </label>
                    <button className="btn action-btn text-white">Generate Worksheet</button>
                    <ErrorWarning />
                </form>
            )}
            {exerciseType === "user-topic" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleSubmitUserTopic}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter your topic:</span>
                        <input 
                            type="text" 
                            placeholder="e.g. technology" 
                            className="input input-bordered w-full" 
                            value={userTopicPayload.topic} 
                            onChange={(e) => setUserTopicPayload((prev) => ({...prev, topic: e.target.value}))}
                            required 
                        />
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of terms (max 10 per page):</span>
                        <input 
                            type="number" 
                            placeholder="e.g. 6" 
                            className="input input-bordered w-full" 
                            value={userTopicPayload.numTerms} 
                            onChange={(e) => handleNumTerms(e)}
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