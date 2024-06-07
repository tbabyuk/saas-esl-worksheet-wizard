"use client"

import { useState, useRef, useEffect } from "react"
import { useReactToPrint } from "react-to-print";
import { FillInTheBlanksOptions } from "./FillInTheBlanksOptions";
import { EditContentButton } from "../components/EditContentButton";



const FillInTheBlanksWorksheetPage = () => {

  const contentToPrint = useRef(null);
  const contentEditableDiv = useRef();
  const [outputWithBlanks, setOutputWithBlanks] = useState("");
  const [contentEditable, setContentEditable] = useState(false);

//   console.log("Logging questions array from MC page.jsx:", questionsArray)


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
          <h1 className="text-4xl mb-10 text-center font-semibold">Fill-In-The-Blanks Exercises</h1>
          <FillInTheBlanksOptions setOutputWithBlanks={setOutputWithBlanks} />
        </div>

        <div>
          <div className="md:scale-[85%] w-full">
          <div ref={contentToPrint} className="h-[1056px] w-[816px] max-w-[100%] mx-auto border-2 border-gray-300 shadow-lg p-6 relative">
              <div className="h-[190px]">
              <h2 className="text-center text-4xl font-semibold pt-10 mb-4">Fill-In-The-Blanks Questions</h2>
              <p className="text-center">Please complete the blanks below with an appropriate word.</p>
              </div>
              <EditContentButton contentEditable={contentEditable} setContentEditable={setContentEditable} />
              <div className={`px-8 leading-8 h-[800px] overflow-y-hidden ${contentEditable && "bg-gray-100"}`} contentEditable={contentEditable} ref={contentEditableDiv}>
                {outputWithBlanks && outputWithBlanks}
                {/* <div className="w-full flex flex-col mx-auto">

                </div> */}
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


export default FillInTheBlanksWorksheetPage;