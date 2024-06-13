"use client";


import { useState } from "react";


export const GrammarCorrectionOptions = ({setOutputArray}) => {

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
  const [userGrammarTopicPayload, setUserGrammarTopicPayload] = useState({
    grammarTopic: "choose",
    numSentences: ""
  })

  const [resultsArray, setResultsArray] = useState([]);


  console.log("logging userGrammarTopic", userGrammarTopicPayload)


  const parseString = (string) => {

    const parsedArray = JSON.parse(string);

    setOutputArray(parsedArray);

    // console.log("from parseString, logging string", string, typeof string)

    // const objectRegex = /{[^{}]+}/;

    // const stringObject = string.match(objectRegex)[0];

    // const parsedString = JSON.parse(stringObject);

    // const keys = Object.keys(parsedString);
    // setObjectKeys(keys)
    // console.log("Logging keys from result:", keys)
    // const values = Object.values(parsedString);
    // setObjectValues(values)
    // console.log("Logging values from result:", values)

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

        const data = await res.json();
        
        // const {result} = await res.json();
        // parseString(result.content);

        } catch(error) {
            console.log("An error occured:", error.message)
        }
  }


  const handleUserGrammarTopicPayload = async (e) => {
    e.preventDefault();

    console.log("Handle Fired")

    try {
        const res = await fetch("/api/grammar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userGrammarTopicPayload)
        })

        const {result} = await res.json();
        console.log("Logging result from handleUserGrammarPayload on front end:", result.content)
        parseString(result.content)

        } catch(error) {
            console.log("An error occured:", error.message)
        }
  }


  return (
    <div className="w-full">
        <div className="w-[450px] max-w-[90%] mx-auto">
            <select className="select select-bordered w-full block mx-auto mb-8" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="choose" disabled>Choose your grammar worksheet options:</option>
                <option value="specific">Generate sentences with mistakes based on a grammar topic.</option>
                <option value="grandom">Generate text with random grammar mistakes.</option>
            </select>
            {exerciseType === "random" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTermsList}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <textarea className="textarea textarea-bordered" placeholder="e.g. term1, term2, term3" value={userTermsList.termsList} onChange={(e) => setUserTermsList({...userTermsList, termsList: e.target.value})}></textarea>
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )}
            {exerciseType === "specific" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserGrammarTopicPayload}>
                    {/* <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter your topic:</span>
                        <input type="text" placeholder="e.g. technology" className="input input-bordered w-full" value={userTopicAndNumTerms.topic} onChange={(e) => setUserTopicAndNumTerms({...userTopicAndNumTerms, topic: e.target.value})} />
                    </label> */}
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Choose grammar topic:</span>
                        <select 
                            className="select select-bordered w-full block mx-auto" 
                            value={userGrammarTopicPayload.grammarTopic} 
                            onChange={(e) => setUserGrammarTopicPayload((prev) => ({...prev, grammarTopic: e.target.value }))}
                            required={userGrammarTopicPayload.grammarTopic === "choose" ? true : false}
                        >
                                <option value="choose" disabled>Choose:</option>
                                <option value="subject-verb-agreement">subject-verb agreement</option>
                                <option value="sentence-fragments">sentence fragments</option>
                                <option value="run-on-sentences">run-on-sentences</option>
                                <option value="wrong-pronoun-usage">wrong pronoun usage</option>
                                <option value="double-negatives">double negatives</option>
                                <option value="wrong-tense">wrong tense</option>
                        </select>
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of sentences to generate:</span>
                        {/* <input type="number" className="border p-2 mb-8" placeholder="e.g. 5 (max 10)" /> */}
                        <input 
                            type="number" 
                            placeholder="e.g. 5 (max. 10)" 
                            className="input input-bordered w-full" 
                            value={userGrammarTopicPayload.numSentences} 
                            onChange={(e) => setUserGrammarTopicPayload((prev) => ({...prev, numSentences: e.target.value}))}
                            required 
                        />
                    </label>
                    <button className="btn action-btn text-white">Generate Worksheet</button>
                </form>
            )}
        </div>
    </div>
  )
}