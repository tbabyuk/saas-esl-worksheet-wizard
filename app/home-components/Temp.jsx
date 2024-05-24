"use client"

import { useState, useRef } from "react"
// import jsPDF from "jspdf"
// import html2canvas from "html2canvas"
// import html2canvas from "html2canvas-pro"


export const TempSection = () => {

  const pdfRef = useRef();


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



      // const objectStringParsed = JSON.parse(objectString);


      // console.log("logging objectStringParsed:", objectStringParsed);

      // console.log("reading response to front end from back end:", data)
  }


  const handleInput = (e) => {
    console.log("logging target name:", e.target.name)
    const key = e.target.name;
    const value = e.target.value;
    setInputObject((prev) => ({...prev, [key]: value }))
  }



  const handleGeneratePDF = async (e) => {
    //   const res = fetch("/api/create-pdf", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(inputObject)
    // })


    // The code below works, but it requires the content to be visible, which I don't want
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('document.pdf');


  };






  return (
    <>
    <div className="min-h-[90vh] py-20 px-5 md:px-12 bg-gray-200">
      <h2 className="text-center text-2xl font-semibold">Testing place for OpenAI Api calls</h2>
      <button className="btn btn-secondary" onClick={handleGeneratePDF}>Generate PDF</button>
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


    <div>
      <h1>PDF Generator</h1>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div ref={pdfRef} className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[url('/images/hero-bg-3.jpg')] grid place-items-center from-blue-500 to-teal-500 text-white text-center h-[300px]">
          <h1 className="text-2xl font-bold">Beautiful Table</h1>
        </div>
        <div className="p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-teal-600 text-white">{objectKeys && objectKeys[0]}</th>
                <th className="py-2 px-4 bg-teal-600 text-white">{objectKeys && objectKeys[1]}</th>
                <th className="py-2 px-4 bg-teal-600 text-white">{objectKeys && objectKeys[2]}</th>
                <th className="py-2 px-4 bg-teal-600 text-white">{objectKeys && objectKeys[3]}</th>
                <th className="py-2 px-4 bg-teal-600 text-white">{objectKeys && objectKeys[4]}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{objectValues && objectValues[0]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{objectValues && objectValues[1]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{objectValues && objectValues[2]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{objectValues && objectValues[3]}</td>
                <td className="py-2 px-4 border-b border-gray-200">{objectValues && objectValues[4]}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="py-2 px-4 bg-teal-600 text-white text-right font-bold">Total</td>
                <td className="py-2 px-4 bg-teal-600 text-white font-bold">$197.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>  
      <button onClick={handleGeneratePDF}>Download PDF</button>
      
    </div>


      {/* <div className="min-h-[90vh] py-20 px-5 md:px-12 bg-gray-200">
       <div className="App">
         <input type="text" placeholder="Name" name="name" value={inputObject.name} onChange={handleInput} />
         <input type="number" placeholder="Receipt ID" name="receiptId" value={inputObject.receiptId} onChange={handleInput} />
         <input type="number" placeholder="Price 1" name="price1" value={inputObject.price1} onChange={handleInput} />
         <input type="number" placeholder="Price 2" name="price2" value={inputObject.price2} onChange={handleInput} />
         <button onClick={handleGeneratePDF}>Download PDF</button>
       </div>
     </div> */}
    </>
  )
}