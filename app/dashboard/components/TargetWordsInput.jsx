"use client"

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";



export const TargetWordsInput = ({userPayload, setUserPayload}) => {

    const [currentValue, setCurrentValue] = useState("");
    const {userWordsAsBlanksArray} = userPayload;

    console.log("logging userWordsAsBlanksArray from TargetWordsInput:", userWordsAsBlanksArray)


    const handleAddWord = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            setUserPayload(prev => ({
                ...prev,
                userWordsAsBlanksArray: [...prev.userWordsAsBlanksArray, currentValue]
            }))
            setCurrentValue("");
        }
    }

    const handleDeleteWord = (e) => {
        const targetWord = e.target.closest("span").innerText;
        setUserPayload(prev => ({
            ...prev,
            userWordsAsBlanksArray: prev.userWordsAsBlanksArray.filter((word) => word !== targetWord)
        }))
    }



    return (
        <>
            <input type="text" placeholder="press 'Enter' after each word" className="input input-bordered w-full" onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} onKeyDown={handleAddWord} />
            <div className="mt-4 flex flex-wrap gap-2">
                {userWordsAsBlanksArray &&
                    userWordsAsBlanksArray.map((word) => (
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