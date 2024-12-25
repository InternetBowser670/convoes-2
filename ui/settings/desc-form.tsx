"use client";

import { useState } from 'react';

export default function DescEdit() {

    let baseUrl: string;
    const useProdUrl = false
    if (useProdUrl) {
        baseUrl = "https://convoes-2.internetbowser.com"
    } else {
        baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://convoes-2.internetbowser.com"
    }

    const [desc, setDesc] = useState("");

    const descSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        fetch(`${baseUrl}/api/settings/desc`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                desc: desc
            })
        })
        alert(`Updated at ${baseUrl}/api/settings/desc`)
    }

    return (<form onSubmit={descSubmit}>
        <input placeholder={`New Description`} className="rounded-xl p-1 focus:outline-none text-black text-sm" type="text" value={desc}
            onChange={(e) => setDesc(e.target.value)}></input>
        <input type="submit" value="Update" className="border-white ml-2 hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 p-1"></input>
    </form>)
}