"use client";


import { useState, useRef } from "react";
import { ErrorWarning } from "@/app/components/ErrorWarning";
import { FreeTrialFinishedModal } from "@/app/components/FreeTrialFinishedModal";
import { OutOfCreditsModal } from "@/app/components/OutOfCreditsModal";

export const GrammarCorrectionOptions = ({setOutputArray}) => {

  const freeTrialFinishedModalRef = useRef();
  const outOfCreditsModalRef = useRef();

  const [exerciseType, setExerciseType] = useState("choose");
//   const [userTermsList, setUserTermsList] = useState({
//     action: "action1",
//     termsList: ""
//   });
//   const [userTopicAndNumTerms, setUserTopicAndNumTerms] = useState({
//     action: "action2",
//     topic: "",
//     numTerms: ""
//   });
  const [userGrammarTopicPayload, setUserGrammarTopicPayload] = useState({
    grammarTopic: "choose",
    numSentences: ""
  })

  const [grammarTopicError, setGrammarTopicError] = useState("");


  console.log("logging userGrammarTopic", userGrammarTopicPayload)


  const parseString = (string) => {

    // console.log("logging string from parseString func:", string, typeof string)

    // captures only the string content inside [ ] brackets
    const arrayRegex = /\[[^\[\]]*?(?:\[[^\[\]]*?\][^\[\]]*?)*\]/;

    const stringArray = string.match(arrayRegex)[0];

    console.log("logging stringArray after regex", stringArray, typeof stringArray)

    const parsedArray = JSON.parse(stringArray);

    setOutputArray(parsedArray);
  }


  const handleNumSentencesInput = (e) => {
    const userInput = e.target.value;

    if(userInput > 10) {
        setUserGrammarTopicPayload((prev) => ({...prev, numSentences: 10}))
    } else {
        setUserGrammarTopicPayload((prev) => ({...prev, numSentences: e.target.value}))
    }
  }


  const handleUserGrammarTopicSelect = (e) => {
        setGrammarTopicError("");
        setUserGrammarTopicPayload((prev) => ({...prev, grammarTopic: e.target.value}))
    // (e) => setUserGrammarTopicPayload((prev) => ({...prev, grammarTopic: e.target.value }))
  }


  const handleUserGrammarTopicPayload = async (e) => {
    e.preventDefault();

    if(userGrammarTopicPayload.grammarTopic === "choose") {
        setGrammarTopicError("please select a grammar topic to focus on")
        return;
    }

    console.log("Handle Fired")

    try {
        setOutputArray([])
        const res = await fetch("/api/grammar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userGrammarTopicPayload)
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
                <option value="grammar-topic">Generate sentences with mistakes based on a grammar topic</option>
                {/* <option value="grandom">Generate text with random grammar mistakes.</option> */}
            </select>
            {/* {exerciseType === "random" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserTermsList}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter the terms you would like included:</span>
                        <textarea className="textarea textarea-bordered" placeholder="e.g. term1, term2, term3" value={userTermsList.termsList} onChange={(e) => setUserTermsList({...userTermsList, termsList: e.target.value})}></textarea>
                    </label>
                    <button className="btn btn-primary text-white">Generate Worksheet</button>
                </form>
            )} */}
            {exerciseType === "grammar-topic" && (
                <form className="w-full mx-auto flex flex-col mb-8" onSubmit={handleUserGrammarTopicPayload}>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Choose grammar topic:</span>
                        <select 
                            className="select select-bordered w-full block mx-auto" 
                            value={userGrammarTopicPayload.grammarTopic} 
                            onChange={(e) => handleUserGrammarTopicSelect(e)}
                            // required={userGrammarTopicPayload.grammarTopic === "choose" ? true : false}
                        >
                                <option value="choose" disabled>Choose:</option>
                                <option value="subject-verb-agreement">subject-verb agreement</option>
                                <option value="sentence-fragments">sentence fragments</option>
                                <option value="run-on-sentences">run-on-sentences</option>
                                <option value="wrong-pronoun-usage">wrong pronoun usage</option>
                                <option value="double-negatives">double negatives</option>
                                <option value="wrong-tense">wrong tense</option>
                        </select>
                        {grammarTopicError && (
                            <p className="text-sm text-red-500 px-2 mt-1">{grammarTopicError}</p>
                        )}
                    </label>
                    <label className="flex flex-col mb-8">
                        <span className="mb-2">Enter number of sentences to generate (max 10 per page):</span>
                        <input 
                            type="number"
                            placeholder="e.g. 5 (max. 10)" 
                            className="input input-bordered w-full" 
                            value={userGrammarTopicPayload.numSentences} 
                            onChange={(e) => handleNumSentencesInput(e)}
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