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

    console.log("from parseString, logging string", string, typeof string)

    // const objectRegex = /{[^{}]+}/;
    // const arrayRegex = /\[[^\[\]]*\]/;
    ;

    // const stringObject = string.match(arrayRegex);

    const parsedArray = JSON.parse(string);

    setQuestionsArray(parsedArray);

    console.log("Logging parsedString from MCOptions:", parsedArray, typeof parsedArray);

    // const keys = Object.keys(parsedString);
    // setObjectKeys(keys)
    // console.log("Logging keys from result:", keys)
    // const values = Object.values(parsedString);
    // setObjectValues(values)
    // console.log("Logging values from result:", values)

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
                {/* <option value="ai">Have AI create both terms and their meanings, based on a topic.</option> */}
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
            {/* {exerciseType === "ai" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTopicAndNumTerms}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter your topic:</span>
                        <input type="text" placeholder="e.g. technology" className="input input-bordered w-full" value={userTopicAndNumTerms.topic} onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, topic: e.target.value})} />
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of terms:</span>
                        <input type="number" placeholder="e.g. 5 (max. 10)" className="input input-bordered w-full" value={userTopicAndNumTerms.numTerms} onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, numTerms: e.target.value})} />
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )} */}
        </div>
    </div>
  )
}