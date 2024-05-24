"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print";
import { OptionsMenu } from "../../components/OptionsMenu";

const MatchingWorksheetPage = () => {

  const contentToPrint = useRef(null);


  const [aiResponse, setAiResponse] = useState("")
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputObject, setInputObject] = useState({});
  const [aiObject, setAiObject] = useState({});
  const [objectKeys, setObjectKeys] = useState([]);
  const [objectValues, setObjectValues] = useState([]);


  console.log("Logging ai object keys:", objectKeys)
  console.log("Logging ai object values:", objectValues)


  const parseString = (string) => {
    const objectRegex = /{[^{}]+}/;

    const resultObject = string.match(objectRegex)[0];

    const parsedResultObject = JSON.parse(resultObject);

    console.log("logging resultObject:", parsedResultObject, typeof parsedResultObject)

    const keys = Object.keys(parsedResultObject);
    setObjectKeys(keys)
    const values = Object.values(parsedResultObject);
    setObjectValues(values)
        
  }



// old code for rea-time chat with OpenAI
  const handleApiCall = async (e) => {
    e.preventDefault();
    console.log("logging messages from handleApiCall", messages)
    const userMessage = {
      role: "user",
      content: prompt
    }
      const res = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([...messages, userMessage])
      })
      const data = await res.json()
      setMessages(prev => [...prev, userMessage, data])
      setAiResponse(data.content)
      console.log("data content is type:", typeof data.content)
      parseString(data.content)
  }


  const handleInput = (e) => {
    console.log("logging target name:", e.target.name)
    const key = e.target.name;
    const value = e.target.value;
    setInputObject((prev) => ({...prev, [key]: value }))
  }



  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });




  return (
      <div className="pb-16">
        <div className="py-16 px-5 md:px-12 bg-gray-100 border-b-2 border-gray-200">
          <h1 className="text-4xl mb-10 text-center font-semibold">Matching Exercises</h1>
          <OptionsMenu setObjectKeys={setObjectKeys} setObjectValues={setObjectValues} />
        </div>

        <div>
          <div className="md:scale-[85%] w-full">
          <div ref={contentToPrint} className="h-[1056px] w-[816px] max-w-[100%] mx-auto border-2 border-gray-300 shadow-lg p-6 overflow-hidden">
              <div className="h-[200px]">
              <h2 className="text-center text-4xl font-semibold pt-10 mb-4">Matching Exercise</h2>
              <p className="text-center mb-16">Match the terms below with their respective definitions</p>
              </div>
              <div className="grid grid-cols-3 gap-x-3 py-5 h-[800px]">
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

        <button className="block mx-auto btn btn-secondary" onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}>
          PRINT OR DOWNLOAD WORKSHEET
        </button>
      </div>
  )
}



export default MatchingWorksheetPage;