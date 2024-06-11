"use client"

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";



export const MatchingTargetWordsInput = ({userTerms, setUserTerms}) => {

    const [currentValue, setCurrentValue] = useState("");
    const {userTermsArray} = userTerms;

    // console.log("logging userWordsAsBlanksArray from TargetWordsInput:", userWordsAsBlanksArray)


    const handleAddWord = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            setUserTerms(prev => ({
                ...prev,
                userTermsArray: [...prev.userTermsArray, currentValue]
            }))
            setCurrentValue("");
        }
    }

    const handleDeleteWord = (e) => {
        const targetWord = e.target.closest("span").innerText;
        setUserTerms(prev => ({
            ...prev,
            userTermsArray: prev.userTermsArray.filter((word) => word !== targetWord)
        }))
    }


    return (
        <>
            <input type="text" placeholder="press 'Enter' after each word" className="input input-bordered w-full" onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} onKeyDown={handleAddWord} />
            <div className="mt-4 flex flex-wrap gap-2">
                {userTermsArray &&
                    userTermsArray.map((word) => (
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