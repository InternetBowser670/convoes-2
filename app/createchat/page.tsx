"use client";

import {JetBrains_Mono} from "next/font/google";
import { SetStateAction, useState} from "react";
import { profanity } from '@2toad/profanity';

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});


export default function Page() {
    const [privacyOption, setPrivacyOption] = useState('');
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

        if (profanity.exists(chatName)) {
            alert("Please enter a valid chat name that does not include any profanity");
            return;
        }

        if (!chatPassword) {
            alert("Please enter a chat password");
            return;
        }

        if (!privacyOption) {
            alert("Please select a privacy option");
            return;
        }

        fetch(`${baseUrl}/api/createchat`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                chatName: chatName,
                privacyOption: privacyOption,
                chatPassword: chatPassword,
            })
        }) .then(response => {
            if (response.ok) {
                alert("Successfully created Convo");
            } else {
                // Request failed
                alert("Convo Creation Failed");
            }
        })


    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPrivacyOption(event.target.value);
    };
    return (<>
        <div className="flex flex-col h-full justify-center align-center p-5 content-center items-center">
            <div className={`flex flex-col  items-center backdrop-filter backdrop-blur-md h-[400px] border-white border-2 rounded-2xl w-[30%] p-5 ${jetbrains_400weight.className}`}>
                <p className={`text-lg font-bold ${jetbrains_400weight.className}`}>
                    Create A Convo
                </p>
                <br />
                <form onSubmit={createChatSubmit}>
                    <label htmlFor={"chatName"} className={`text-sm ${jetbrains_400weight.className}`}>
                        Convo Name:
                    </label>
                    <input onChange={(e) => setChatName(e.target.value)}
                           className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}
                           placeholder={"General"} type={"text"}>
                    </input>
                    <br/>
                    <br />
                    <label htmlFor={"chatPassword"} className={`text-sm ${jetbrains_400weight.className}`}>
                        Chat Password:
                    </label>
                    <input onChange={(e) => setChatPassword(e.target.value)}
                           className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}
                           placeholder={"Password0!"} type={"password"}>
                    </input>
                    <br/>
                    <br/>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="private"
                            checked={privacyOption === 'private'}
                            onChange={handleChange}
                        />

                        ​ Private
                    </label>
                    <br/>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="public"
                            checked={privacyOption === 'public'}
                            onChange={handleChange}
                        />
                        ​ Public
                    </label>
                    <br/>
                    <br/>
                    <input type="submit"
                           className={`border-white ml-2 hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 p-[2]`}
                           value="Create"/>
                </form>
            </div>
        </div>
    </>);
}