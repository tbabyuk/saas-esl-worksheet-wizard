"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FreeTrialFinishedModal } from "@/app/components/FreeTrialFinishedModal";
import { OutOfCreditsModal } from "@/app/components/OutOfCreditsModal";
import { MatchingTargetWordsInput } from "./components/MatchingTargetWordsInput";
import { ErrorWarning } from "@/app/components/ErrorWarning";

export const MatchingOptions = ({setObjectKeys, setObjectValues}) => {

  const {user} = useUser();
  const freeTrialFinishedModalRef = useRef();
  const outOfCreditsModalRef = useRef();

  console.log("logging current user:", user)

  const [exerciseType, setExerciseType] = useState("choose");
  const [userTerms, setUserTerms] = useState({
    action: "action1",
    userTermsArray: []
  });
  const [userTopicAndNumTerms, setUserTopicAndNumTerms] = useState({
    action: "action2",
    topic: "",
    numTerms: ""
  });
  const [inputError, setInputError] = useState("");


  console.log("logging userTermsList:", userTerms)
  console.log("logging userTopicAndNumTerms:", userTopicAndNumTerms)


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

    const parsedString = JSON.parse(stringObject);

    console.log("logging parsed String from MatchingOptions:", parsedString)
    
    const keys = Object.keys(parsedString);

    setObjectKeys(Object.keys(parsedString));
    console.log("Logging keys from result:", keys)

    const values = Object.values(parsedString);
    setObjectValues(shuffleArray(values))
    console.log("Logging values from result:", values)
  }


  const handleNumTerms = (e) => {
    const userInput = e.target.value;
    if(userInput > 10) {
        setUserTopicAndNumTerms((prev) => ({...prev, numTerms: 10}))
    } else {
        setUserTopicAndNumTerms((prev) => ({...prev, numTerms: e.target.value}))
    }
  }


  const handleUserTerms = async (e) => {
    e.preventDefault();

    if(userTerms.userTermsArray.length === 0) {
        setInputError("you must enter at least one term before submitting")
        return;
    }

    try {
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTerms)
        })

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
        parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error)
        }
  }


  const handleUserTopicAndNumTerms = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTopicAndNumTerms)
        })

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
                <option value="terms">Create a matching worksheet from terms provided by me</option>
                <option value="ai">Have AI create both terms and their meanings based on a topic</option>
            </select>
            {exerciseType === "terms" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTerms}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <MatchingTargetWordsInput userTerms={userTerms} setUserTerms={setUserTerms} inputError={inputError} setInputError={setInputError} />
                    </label>
                    <button className="btn action-btn text-white">Generate Worksheet</button>
                    <ErrorWarning />
                </form>
            )}
            {exerciseType === "ai" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTopicAndNumTerms}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter your topic:</span>
                        <input 
                            type="text" 
                            placeholder="e.g. technology" 
                            className="input input-bordered w-full" 
                            value={userTopicAndNumTerms.topic} 
                            onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, topic: e.target.value})}
                            required 
                        />
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of terms:</span>
                        <input 
                            type="number" 
                            placeholder="e.g. 5 (max. 10)" 
                            className="input input-bordered w-full" 
                            value={userTopicAndNumTerms.numTerms} 
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