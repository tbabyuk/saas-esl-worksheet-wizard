"use client"


import { useState } from "react";
import { RxCross2 } from "react-icons/rx";


export const TagsInput = ({userPayload, setUserPayload}) => {

    const [currentValue, setCurrentValue] = useState("");
    const [tags, setTags] = useState(["one"]);
    console.log("Logging currentValue,", currentValue)


    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            setTags(prev => [...prev, currentValue]);
            setCurrentValue("");
        }
    }

    const handleDeleteTag = (e) => {
        console.log(e.target.parentElement.innerText);
        const targetTag = e.target.closest("span").innerText;
        const newTags = tags.filter((tag) => tag !== targetTag);
        setTags(newTags);
    }

    // onChange={(e) => setUserPayload({...userPayload, userWordsAsBlanks: e.target.value})}

    return (
        <>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} onKeyDown={handleKeyDown} />
            <div className="mt-4 flex flex-wrap gap-2">
                {tags &&
                    tags.map((tag) => (
                        <span className="bg-gray-300 py-1 px-2 rounded-md flex justify-center items-center gap-x-2">
                        {tag}
                        <RxCross2 className="cursor-pointer" onClick={handleDeleteTag} />
                        </span>
                    ))
                }
            </div>
        </>
    )
}