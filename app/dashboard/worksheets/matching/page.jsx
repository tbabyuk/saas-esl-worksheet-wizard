"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print";
import { PrintMe } from "@/app/components/PrintMe";
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
      <>
        <div className="py-16 px-5 md:px-12">
          <h1 className="text-4xl mb-10 text-center font-semibold">Matching Exercises</h1>
          <OptionsMenu setObjectKeys={setObjectKeys} setObjectValues={setObjectValues} />
          <h2 className="text-center text-2xl font-semibold">Testing place for OpenAI Api calls</h2>
          <form onSubmit={handleApiCall}>
              <textarea 
                className="p-3" 
                rows={5} 
                cols={30} 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
              >

              </textarea><br />
            <button className="btn btn-secondary">Submit</button>
          </form>

          <div>
            {aiResponse && (
            <div>{aiResponse}</div>
          )}
          </div>
        </div>


        <div className="pt-20 px-10">
          <div ref={contentToPrint} className="min-h-[1056px] bg-yellow-50 p-6">
            <h2 className="text-center text-4xl font-semibold mb-4">Matching Exercise</h2>
            <p className="text-center mb-16">Match the terms below with their respective definitions</p>
            <div className="grid grid-cols-2 gap-x-3">
              <div className="bg-blue-200 min-w-[120px] mx-auto">
                <div type="text" className="matching-term">{objectKeys && objectKeys[0]}</div>
                <div type="text" className="matching-term">{objectKeys && objectKeys[1]}</div>
                <div type="text" className="matching-term">{objectKeys && objectKeys[2]}</div>
                <div type="text" className="matching-term">{objectKeys && objectKeys[3]}</div>
                <div type="text" className="matching-term">{objectKeys && objectKeys[4]}</div>
              </div>
              <div>
                <div type="text" className="matching-meaning">{objectValues && objectValues[0]}</div>
                <div type="text" className="matching-meaning">{objectValues && objectValues[1]}</div>
                <div type="text" className="matching-meaning">{objectValues && objectValues[2]}</div>
                <div type="text" className="matching-meaning">{objectValues && objectValues[3]}</div>
                <div type="text" className="matching-meaning">{objectValues && objectValues[4]}</div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}>
          PRINT
        </button>
      </>
  )
}



export default MatchingWorksheetPage;