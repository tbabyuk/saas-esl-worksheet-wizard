"use client"

import { useState, useRef, useEffect } from "react"
import { useReactToPrint } from "react-to-print";
import { MatchingOptions } from "./MatchingOptions";
import { EditContentButton } from "../components/EditContentButton";



const MatchingWorksheetPage = () => {

  const contentToPrint = useRef(null);
  const contentEditableDiv = useRef();

  const [objectKeys, setObjectKeys] = useState([]);
  const [objectValues, setObjectValues] = useState([]);
  
  const [contentEditable, setContentEditable] = useState(false);


  console.log("Logging ai object keys:", objectKeys)
  console.log("Logging ai object values:", objectValues)


  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  useEffect(() => {
    contentEditableDiv.current.focus();
  }, [contentEditable])

  return (
      <div className="pb-16">
        <div className="py-16 px-5 md:px-12 bg-gray-100 border-b-2 border-gray-200">
          <h1 className="text-4xl mb-10 text-center font-semibold">Matching Exercises</h1>
          <MatchingOptions setObjectKeys={setObjectKeys} setObjectValues={setObjectValues} />
        </div>

        <div>
          <div className="md:scale-[85%] w-full">
          <div ref={contentToPrint} className="h-[1056px] w-[816px] max-w-[100%] mx-auto border-2 border-gray-300 shadow-lg p-6 relative">
              <div className="h-[190px]">
              <h2 className="text-center text-4xl font-semibold pt-10 mb-4">Matching Exercise</h2>
              <p className="text-center">Match the terms below with their respective definitions</p>
              </div>
              <button className="px-3 py-2 rounded-md text-gray-400 font-semibold no-animation absolute -left-[90px] top-[30%] bg-gray-300 -rotate-90" onClick={() => setContentEditable(!contentEditable)}>{contentEditable ? "SAVE CONTENT" : "EDIT CONTENT"}</button>
              <EditContentButton contentEditable={contentEditable} setContentEditable={setContentEditable} />

              <div className={`grid grid-cols-3 gap-x-3 py-5 h-[800px] overflow-y-hidden ${contentEditable && "bg-gray-100"}`} contentEditable={contentEditable} ref={contentEditableDiv}>
                <div className="col-span-1 w-full flex flex-col gap-y-5 mx-auto">
                  <div type="text" className="matching-term">{objectKeys && objectKeys[0]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[1]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[2]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[3]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[4]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[5]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[6]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[7]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[8]}</div>
                  <div type="text" className="matching-term">{objectKeys && objectKeys[9]}</div>
                </div>
                <div className="col-span-2 w-full flex flex-col gap-y-5 mx-auto">
                  <div type="text" className="matching-meaning">{objectValues && objectValues[0]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[1]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[2]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[3]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[4]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[5]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[6]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[7]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[8]}</div>
                  <div type="text" className="matching-meaning">{objectValues && objectValues[9]}</div>
                </div>
              </div>
          </div>
          </div>
        </div>

        <button className="btn action-btn block mx-auto" onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}>
          Print or Download Worksheet
        </button>
      </div>
  )
}


export default MatchingWorksheetPage;