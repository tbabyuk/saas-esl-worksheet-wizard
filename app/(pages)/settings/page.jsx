"use client"

import { useState, useEffect } from "react";


const SettingsPage = () => {

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
      <div className="mt-12 ms-4">
        <p className="mb-8 text-lg">You currently have: {numCredits && numCredits} credits</p>
      </div>
    )
  }

export default SettingsPage;