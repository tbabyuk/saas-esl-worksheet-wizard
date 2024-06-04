"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";


export const MatchingOptions = ({setObjectKeys, setObjectValues}) => {

  const {user} = useUser();

  console.log("logging current user:", user)

  const [exerciseType, setExerciseType] = useState("choose");
  const [userTermsList, setUserTermsList] = useState({
    action: "action1",
    termsList: ""
  });
  const [userTopicAndNumTerms, setUserTopicAndNumTerms] = useState({
    action: "action2",
    topic: "",
    numTerms: ""
  });


  console.log("logging userTermsList:", userTermsList)
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


  const handleUserTermsList = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userTermsList)
        })
        
        const {result} = await res.json();
        parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error.message)
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

        const {result} = await res.json();
        parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error.message)
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
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTermsList}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <textarea className="textarea textarea-bordered" placeholder="e.g. term1, term2, term3" value={userTermsList.termsList} onChange={(e) => setUserTermsList({...userTermsList, termsList: e.target.value})}></textarea>
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
            {exerciseType === "ai" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTopicAndNumTerms}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter your topic:</span>
                        <input type="text" placeholder="e.g. technology" className="input input-bordered w-full" value={userTopicAndNumTerms.topic} onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, topic: e.target.value})} />
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of terms:</span>
                        {/* <input type="number" className="border p-2 mb-8" placeholder="e.g. 5 (max 10)" /> */}
                        <input type="number" placeholder="e.g. 5 (max. 10)" className="input input-bordered w-full" value={userTopicAndNumTerms.numTerms} onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, numTerms: e.target.value})} />
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
        </div>
    </div>
  )
}