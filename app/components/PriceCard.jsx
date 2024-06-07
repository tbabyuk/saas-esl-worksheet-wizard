"use client";

import { FaCheckCircle } from "react-icons/fa";



export const PriceCard = ({plan}) => {

    // const {cost, features} = plan;


    // console.log("logging plan details:", name="20 Credits", cost, features)


    const handleCheckout = async (chosenPlan) => {

        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({item: chosenPlan })
        })

        if(res.ok) {
            const {url} = await res.json();
            window.location.assign(url)
        }
    }


    // if(res.ok) {
    //     const {url} = await res.json()
    //     window.location.assign(url)

    const planOptions = [
        {
            name: "20 Credits",
            cost: "$5.00",
            features: ["20 worksheet generations", "unlimited email support"]
        },
        {
            name: "50 Credits",
            cost: "$10.00",
            features: ["50 worksheet generations", "unlimited email support"]
        },
        {
            name: "100 Credits",
            cost: "$15.00",
            features: ["100 worksheet generations", "unlimited email support"]
        },
      ]



    return (
        <div className="border-2 border-gray-200 rounded-md h-[420px] w-[90%] max-w-[250px] p-4 grid place-items-center cursor-pointer hover:shadow-lg">
            <div className="flex flex-col">
                <span className="font-roboto text-gray-400 font-medium text-2xl mb-4 text-center">20 Credits</span>
                <span className="font-roboto text-gray-500 text-4xl text-center">$5.00</span>
                <hr className="my-8 border-gray-300"></hr>
                <ul className="text-gray-600 font-light text-sm font-roboto">
                    {/* {features?.map((feature) => (
                        <li className="flex items-center py-2">
                            <FaCheckCircle className="me-2 text-green-500" size={15} />{feature}
                        </li>
                    ))} */}
                </ul>
                <hr className="my-8 border-gray-300"></hr>
                <button className="btn font-roboto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0" onClick={() => handleCheckout(name)}>Buy Credits</button>
            </div>
        </div>
    )

}