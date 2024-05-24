"use client";

import { useState } from "react";


export const OptionsMenu = ({setObjectKeys, setObjectValues}) => {

  const [exerciseType, setExerciseType] = useState("choose");
  const [termsList, setTermsList] = useState("");
  const [aiTopic, setAiTopic] = useState("");



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



  const handleTermsList = async (e) => {
    e.preventDefault();
    console.log("Logging terms list:", termsList)
    const termsListString = termsList;
    try {
        const res = await fetch("/api/matching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(termsListString)
        })

        const {result} = await res.json();

        console.log("Logging API response from client:", result.content, typeof result.content)

        parseString(result.content);

    } catch(error) {
        console.log("An error occured:", error.message)
    }
  }

  const handleAiTopic = (e) => {
    e.preventDefault();
    console.log("Logging ai topic:", aiTopic)
  }


  return (
    <div className="w-full border-b-2 border-gray-200">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose matching exercise options</option>
                <option value="terms">Create a matching exercise from terms provided by me.</option>
                <option value="ai">Have AI create both terms and their meanings, based on a topic.</option>
            </select>
            {exerciseType === "terms" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleTermsList}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <textarea className="textarea textarea-bordered" placeholder="e.g. term1, term2, term3" value={termsList} onChange={(e) => setTermsList(e.target.value)}></textarea>
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
            {exerciseType === "ai" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleAiTopic}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter your topic:</span>
                        <input type="text" placeholder="e.g. technology" className="input input-bordered w-full" value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} />
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of terms:</span>
                        {/* <input type="number" className="border p-2 mb-8" placeholder="e.g. 5 (max 10)" /> */}
                        <input type="number" placeholder="e.g. 5 (max. 10)" className="input input-bordered w-full" value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} />
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
        </div>
    </div>
  )
}