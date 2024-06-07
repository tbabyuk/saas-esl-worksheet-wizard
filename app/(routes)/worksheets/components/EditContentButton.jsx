

export const EditContentButton = ({contentEditable, setContentEditable}) => {


    return (
        <button className="px-3 py-2 rounded-md text-gray-400 font-semibold no-animation absolute -left-[90px] top-[30%] bg-gray-300 -rotate-90" onClick={() => setContentEditable(!contentEditable)}>{contentEditable ? "SAVE CONTENT" : "EDIT CONTENT"}</button>
    )
}


