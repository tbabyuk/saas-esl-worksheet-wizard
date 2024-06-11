"use client"

import { useState, useEffect } from "react";


export const ApiCountBalance = () => {

    const [numCredits, setNumCredits] = useState(null);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const res = await fetch("/api/credits");
                const {result} = await res.json();
                setNumCredits(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCredits();
    }, [])

    return (
        <p className="text-lg text-center py-2 bg-emerald-500/10">Your credit balance: &nbsp;&nbsp; <span className="font-bold">{numCredits && numCredits} credits</span></p>
    )
  }