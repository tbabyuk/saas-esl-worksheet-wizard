"use client"

import { useState } from "react"


export const TempSection = () => {

  const [aiResponse, setAiResponse] = useState("")
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);


  // console.log("logging prompt:", prompt)
  console.log("logging messages:", messages)



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

      console.log("reading response to front end from back end:", data)
  }

  // const handleSetMessages = (e) => {

  //   e.preventDefault();

  //   console.log("handleSetMessages fired")

  //   setMessages((prev) => [...prev, {
  //     role: "user",
  //     content: prompt
  //   }])

  //   setTimeout(() => {
  //     handleApiCall()
  //   }, 2000)

  // }




  return (
    <div className="min-h-[90vh] py-20 px-5 md:px-12 bg-gray-200">
      <h2 className="text-center text-2xl font-semibold">Testing place for OpenAI Api calls</h2>
      {/* <button className="btn btn-secondary" onClick={handleApiCall}>Make POST request</button> */}
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
  )
}