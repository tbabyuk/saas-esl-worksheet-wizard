"use client"

import { useState, useRef, useEffect } from "react"
import { useReactToPrint } from "react-to-print";
import { MultipleChoiceOptions } from "./MultipleChoiceOptions";
import { EditContentButton } from "../components/EditContentButton";



const MultipleChoiceWorksheetPage = () => {

  const contentToPrint = useRef(null);
  const contentEditableDiv = useRef();
  const [questionsArray, setQuestionsArray] = useState([]);
  const [contentEditable, setContentEditable] = useState(false);


  console.log("Logging questions array from MC page.jsx:", questionsArray)


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
          <h1 className="text-4xl mb-10 text-center font-semibold">Multiple Choice Exercises</h1>
          <MultipleChoiceOptions setQuestionsArray={setQuestionsArray} />
        </div>

        <div>
          <div className="md:scale-[85%] w-full">
          <div ref={contentToPrint} className="h-[1056px] w-[816px] max-w-[100%] mx-auto border-2 border-gray-300 shadow-lg p-6 relative">
              <div className="h-[190px]">
              <h2 className="text-center text-4xl font-semibold pt-10 mb-4">Multiple Choice Questions</h2>
              <p className="text-center">Choose the correct answer from the below options.</p>
              </div>
              <EditContentButton contentEditable={contentEditable} setContentEditable={setContentEditable} />
              <div className={`px-8 h-[800px] overflow-y-hidden ${contentEditable && "bg-gray-100"}`} contentEditable={contentEditable} ref={contentEditableDiv}>
                <div className="w-full flex flex-col mx-auto">
                  {questionsArray && (
                    <div className="flex flex-col">
                        {questionsArray.map((item, index) => (
                            <div key={index} className="flex flex-col mb-7">
                              <span className="mb-1 font-semibold">{index + 1}. {item.question}</span>
                              <ul style={{listStyleType: "upper-alpha", listStylePosition: "inside"}}>
                              {item.choices.map((choice, index) => (
                                  <li key={index}>{choice}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
          </div>
          </div>
        </div>

        <button className="block mx-auto btn btn-secondary" onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}>
          PRINT OR DOWNLOAD WORKSHEET
        </button>
      </div>
  )
}


export default MultipleChoiceWorksheetPage;