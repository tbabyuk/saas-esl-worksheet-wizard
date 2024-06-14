"use client"

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";



export const MatchingTargetWordsInput = ({userTermsPayload, setUserTermsPayload, inputError, setInputError}) => {

    const [currentValue, setCurrentValue] = useState("");
    const {termsArray} = userTermsPayload;

    console.log("logging userTermsPayload ====================:", userTermsPayload)


    const handleAddWord = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            setUserTermsPayload(prev => ({
                ...prev,
                termsArray: [...prev.termsArray, currentValue]
            }))
            setCurrentValue("");
        }
        setInputError("")
    }

    const handleDeleteWord = (e) => {
        const targetWord = e.target.closest("span").innerText;
        setUserTermsPayload(prev => ({
            ...prev,
            termsArray: prev.termsArray.filter((word) => word !== targetWord)
        }))
    }


    return (
        <>
            <input 
                type="text" 
                placeholder="press 'Enter' after each term" 
                className="input input-bordered w-full" 
                onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} 
                onKeyDown={handleAddWord} 
            />
            {inputError && (
                <p className="text-sm text-red-500 px-2">{inputError}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
                {termsArray &&
                    termsArray.map((word) => (
                        <span key={word} className="bg-gray-300 py-1 px-2 rounded-md flex justify-center items-center gap-x-2">
                        {word}
                        <RxCross2 className="cursor-pointer" onClick={handleDeleteWord} />
                        </span>
                    ))
                }
            </div>
        </>
    )
}