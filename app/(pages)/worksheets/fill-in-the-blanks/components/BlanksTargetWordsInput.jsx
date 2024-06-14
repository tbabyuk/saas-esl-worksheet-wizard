

"use client"

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";


export const BlanksTargetWordsInput = ({userBlanksPayload, setUserBlanksPayload, blanksTermsError, setBlanksTermsError}) => {

    const [currentValue, setCurrentValue] = useState("");
    const {wordsAsBlanksArray} = userBlanksPayload;


    const handleAddWord = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            setUserBlanksPayload(prev => ({
                ...prev,
                wordsAsBlanksArray: [...prev.wordsAsBlanksArray, currentValue]
            }))
            setCurrentValue("");
        }
        setBlanksTermsError("");
    }

    const handleDeleteWord = (e) => {
        const targetWord = e.target.closest("span").innerText;
        setUserBlanksPayload(prev => ({
            ...prev,
            wordsAsBlanksArray: prev.wordsAsBlanksArray.filter((word) => word !== targetWord)
        }))
    }



    return (
        <>
            <input type="text" placeholder="press 'Enter' after each word" className="input input-bordered w-full" onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} onKeyDown={handleAddWord} />
            {blanksTermsError && (
                <p className="text-sm text-red-500 px-2">{blanksTermsError}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
                {wordsAsBlanksArray &&
                    wordsAsBlanksArray.map((word) => (
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