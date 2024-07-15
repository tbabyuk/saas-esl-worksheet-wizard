"use client"


import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";



export const ApiCountDisplay = () => {


    const [apiCount, setApiCount] = useState("")
    

    const fetchUserApiCount = async () => {

    try {
        const response = await fetch("/api/api-count", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({greeting: "Greetings!"})
        });

        if(!response.ok) {
            throw new Error("some went wrong while fetching API count")
        }

        const {currentUserApiCount} = await response.json();
        setApiCount(currentUserApiCount)

        } catch(error) {
            console.log("An error occurred", error.message)
        }
    }


    useEffect(() => {
        fetchUserApiCount();
    }, [])


    return (
        <p className="text-lg text-center py-2 bg-emerald-500/10">Your credit balance: &nbsp;&nbsp; <span className="font-bold text-gray-600">{apiCount && apiCount} {apiCount && apiCount === 1 ? "credit" : "credits"}</span></p>
    )
  }