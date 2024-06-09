"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export const MatchingOptions = ({setObjectKeys, setObjectValues}) => {

  const {user} = useUser();
  const router = useRouter();

  console.log("logging current user:", user)

  const [exerciseType, setExerciseType] = useState("choose");
  const [userTerms, setUserTerms] = useState({
    action: "action1",
    termsList: ""
  });
  const [userTopicAndNumTerms, setUserTopicAndNumTerms] = useState({
    action: "action2",
    topic: "",
    numTerms: ""
  });
  const [freeTrialIsOverModal, setFreeTrialIsOverModal] = useState(false);
  const [creditsFinishedModal, setCreditsFinishedModal] = useState(false)


  console.log("logging userTermsList:", userTerms)
  console.log("logging userTopicAndNumTerms:", userTopicAndNumTerms)


  const parseString = (string) => {

    console.log("from parseString, logging string", string, typeof string)

    const objectRegex = /{[^{}]+}/;

    const stringObject = string.match(objectRegex)[0];

    const parsedString = JSON.parse(stringObject);

    const keys = Object.keys(parsedString);
    setObjectKeys(keys)
    console.log("Logging keys from result:", keys)
    const values = Object.values(parsedString);
    setObjectValues(values)
    console.log("Logging values from result:", values)

  }


  const handleUserTerms = async (e) => {
    e.preventDefault();

    const userTermsWithUserId = {
        ...userTerms,
        userId: user.id
    }

    try {

        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTermsWithUserId)
        })
        
        const {result} = await res.json();
        parseString(result.content);

        } catch(error) {
            console.log("An error occured=================:", error)
        }
  }


  const handleUserTopicAndNumTerms = async (e) => {
    e.preventDefault();

    const userTopicAndNumTermsWithUserId = {
        ...userTopicAndNumTerms,
        userId: user.id
    }

    try {
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTopicAndNumTermsWithUserId)
        })

        if(!res.ok) {
            const {message} = await res.json();
            if(message === "free trial expired") {
                console.log("Free trial has expired")
                setFreeTrialIsOverModal(true);
            }
            if(message === "out of credits") {
                console.log("The user is out of credits!")
                setCreditsFinishedModal(true)
            }
        }

        const {result} = await res.json();
        parseString(result.content);

    } catch(error) {
        console.log("An error occured:", error)
    } finally {
        router.refresh();
    }
  }


  return (
    <div className="w-full">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose your matching options:</option>
                <option value="terms">Create a matching exercise from terms provided by me.</option>
                <option value="ai">Have AI create both terms and their meanings, based on a topic.</option>
            </select>
            {exerciseType === "terms" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTerms}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <textarea className="textarea textarea-bordered" placeholder="e.g. term1, term2, term3" value={userTerms.termsList} onChange={(e) => setUserTerms({...userTerms, termsList: e.target.value})}></textarea>
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
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
                        {/* <input type="number" className="border p-2 mb-8" placeholder="e.g. 5 (max 10)" /> */}
                        <input 
                            type="number" 
                            placeholder="e.g. 5 (max. 10)" 
                            className="input input-bordered w-full" 
                            value={userTopicAndNumTerms.numTerms} 
                            onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, numTerms: e.target.value})}
                            required 
                        />
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
        </div>

        {freeTrialIsOverModal && (
            <div className="fixed top-0 left-0 w-full h-[100%] z-50 bg-black/50 grid place-items-center">
                <div className="bg-gray-100 h-[100px] w-[200px]">Your free trial is over, please buy credits!</div>
            </div>
        )}

        {creditsFinishedModal && (
            <div className="fixed top-0 left-0 w-full h-[100%] z-50 bg-black/50 grid place-items-center">
                <div className="bg-gray-100 h-[100px] w-[200px]">Your credits are at 0, please buy more credits!</div>
            </div>
        )}
    </div>
  )
}