"use client";

import { JetBrains_Mono } from "next/font/google";
import { useState } from "react";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});


export default function Page() {
    const [chatName, setChatName] = useState('');
    const [chatPassword, setChatPassword] = useState('');

    let baseUrl: string;
    const useProdUrl = false
    if (useProdUrl) {
        baseUrl = "https://convoes-2.internetbowser.com"
    } else {
        baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://convoes-2.internetbowser.com"
    }

    const createChatSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!chatName) {
            alert("Please enter a chat name");
            return
        }

        fetch(`${baseUrl}/api/joinchat`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                chatName: chatName,
                password: chatPassword,
            })
        }).then(async response => {
            const data = await response.json();
            if (response.ok) {
                alert("Successfully joined Convo");
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("Convo Joining Failed");
                }
            }
        })


    }
    return (<>
        <div className="flex flex-col h-full justify-center align-center p-5 content-center items-center">
            <div className={`flex flex-col  items-center backdrop-filter backdrop-blur-md border-white border-2 rounded-2xl w-[30%] p-5 ${jetbrains_400weight.className}`}>
                <p className={`text-lg font-bold ${jetbrains_400weight.className}`}>
                    Join a Private Convo
                </p>
                <br />
                <form onSubmit={createChatSubmit}>
                    <label htmlFor={"chatName"} className={`text-sm ${jetbrains_400weight.className}`}>
                        Convo Name:
                    </label>
                    <br />
                    <input onChange={(e) => setChatName(e.target.value)}
                           className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none  text-black`}
                           placeholder={"General"} type={"text"}>
                    </input>
                    <br />
                    <br />
                        <>
                            <label htmlFor={"chatPassword"} className={`text-sm ${jetbrains_400weight.className}`}>
                                Chat Password:
                            </label>
                            <br />
                            <input onChange={(e) => setChatPassword(e.target.value)}
                                   className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}
                                   placeholder={"Password0!"} type={"password"}>
                            </input>
                        </>
                    <br />
                    <br />
                    <input type="submit"
                           className={`border-white ml-2 hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 p-[2]`}
                           value="Join" />
                </form>
            </div>
        </div>
    </>);
}