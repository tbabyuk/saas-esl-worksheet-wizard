"use client"


import { FaCheckCircle } from "react-icons/fa";



export const PlanCard = ({numCredits, cost, features}) => {


    console.log("loggin features:", features)


    const handleCheckout = async (credits) => {

        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({numberOfCredits: credits})
        })

        if(res.ok) {
            const {url} = await res.json();
            window.location.assign(url)
        }
    }



    return (
        <div className="border-2 border-gray-200 rounded-md h-[420px] w-[90%] max-w-[250px] p-4 grid place-items-center cursor-pointer hover:shadow-lg">
            <div className="flex flex-col">
                <span className="font-roboto text-gray-400 font-medium text-2xl mb-4 text-center">{numCredits} Credits</span>
                <span className="font-roboto text-gray-500 text-4xl text-center">{cost}</span>
                <hr className="my-8 border-gray-300"></hr>
                <ul className="text-gray-600 font-light text-sm font-roboto">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center py-2">
                            <FaCheckCircle className="me-2 text-green-500" size={15} />{feature}
                        </li>
                    ))}
                </ul>
                <hr className="my-8 border-gray-300"></hr>
                <button className="btn font-roboto gradient-btn" onClick={() => handleCheckout(numCredits)}>Buy Credits</button>
            </div>
        </div>
    )

}