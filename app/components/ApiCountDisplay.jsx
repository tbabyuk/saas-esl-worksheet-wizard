"use client"

import { connectToESLWorksheetWizardDB } from "@/db/database";
import { User } from "@/models/models";
import { auth } from '@clerk/nextjs/server';
import { useState, useEffect } from "react";



export const ApiCountDisplay = async () => {

    const [apiCount, setApiCount] = useState("")
    
    const {userId} = auth();

    console.log("Logging userId from ApiCountDisplay:", userId)


    const fetchAPICount = async () => {
        try {
            await connectToESLWorksheetWizardDB();
            const user = await User.findOne({ userClerkId: userId });
            console.log("logging user from ApiCountDisplay:", user)
            setApiCount(user.userApiCount);
            } catch (error) {
                console.log("An error occured:", error)
            }    
        }


    useEffect(() => {
        fetchAPICount()
    }, [])


    return (
        <p className="text-lg text-center py-2 bg-emerald-500/10">Your credit balance: &nbsp;&nbsp; <span className="font-bold text-gray-600">{apiCount && apiCount} {apiCount && apiCount === 1 ? "credit" : "credits"}</span></p>
    )
  }