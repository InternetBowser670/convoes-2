"use client";

import { useState, useEffect } from 'react';
import { MessageDocument } from "@/app/lib/types";
import { JetBrains_Mono } from "next/font/google";
import { useUser } from '@clerk/nextjs'

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export const dynamic = 'force-dynamic';


let baseUrl: string;
const useProdUrl = false
if (useProdUrl) {
    baseUrl = "https://convoes-2.internetbowser.com"
} else {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://convoes-2.internetbowser.com"
}


function formatUnixToLocalTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp); // Convert the timestamp to a Date object
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true, // For 12-hour format with AM/PM
    };

    return new Intl.DateTimeFormat(undefined, options).format(date);
}



export function ChatBox({
    chatname,
}: {
    chatname: string;
}) {

    const [message, setMessage] = useState("")
    const [data, setData] = useState<MessageDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const messagesDiv = document.getElementById('messages');

    const {user} = useUser()

    async function updateMessages() {
        try {
            const response = await fetch(`${baseUrl}/api/chatmessages/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    chatName: chatname,
                })
            });
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }
    };

    function scrollToBottom() {
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }
    scrollToBottom();

    const createChatSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const date = () => Date.now();

        if (!message) {
            alert("Please enter a message");
            return
        }

        scrollToBottom()

        setData([...data, { message: message, _id: (date() * Math.random()).toString(), type: "textMessage", sentAt: date(), username: user?.username || "N/A", image_url: user?.imageUrl || "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycGw2MWhCQlZzTEJPeVpPMDJmUkQ2TExoQzQiLCJyaWQiOiJ1c2VyXzJySmtnVW05WVU3R21PclFrVXZLNTFMS3BWaiJ9" }]);
        scrollToBottom()

        

        setMessage("");
        scrollToBottom()

        fetch(`${baseUrl}/api/sendmessage`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                chatName: chatname,
                message: message,
            })
        }).then(async response => {
            const data = await response.json();
            updateMessages();
            if (response.ok) {
                scrollToBottom();
                return
            }
            if (response.status === 401) {
                alert("Unauthorized");
            } else {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("Convo Creation Failed");
                }
            }
        })


    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/chatmessages/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        chatName: chatname,
                    })
                });
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className={`border-2 rounded-2xl m-20 mt-10 overflow-hidden ${jetbrains_400weight.className}`}>
                {isLoading ? (
                    <MsgsFallback />
                ) : (
                    <div id="messages" className="h-[500px] overflow-y-scroll">
                        {data.sort((a, b) => a.sentAt - b.sentAt).map((msg: MessageDocument) => {
                            if (msg.type === "textMessage") {
                                return (
                                    <div
                                        key={msg._id}
                                        className="backdrop-filter backdrop-blur-md border-white border-2 rounded-2xl w-[1/4] m-3 p-3 shrink"
                                    >
                                        <div className="flex items-center content-center">
                                            <img
                                                src={
                                                    msg.image_url ||
                                                    "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycGw2MWhCQlZzTEJPeVpPMDJmUkQ2TExoQzQiLCJyaWQiOiJ1c2VyXzJxWDQyMERNZno2RHFnbkJTckQxWGowbFpxUiIsImluaXRpYWxzIjoiQVgifQ"
                                                }
                                                className="rounded-full pfp"
                                                alt={`${msg.username}'s pfp`}
                                            />
                                            <p className="ml-2">@{msg.username}</p>
                                            <p className="ml-2 text">- {formatUnixToLocalTime(msg.sentAt)}</p>
                                        </div>
                                        <br />
                                        {msg.message ? (
                                            <p className="text-ellipsis overflow-hidden seeMoreText">{msg.message}</p>
                                        ) : (
                                            <>
                                                <p className='opacity-50'>Blank</p>
                                                <br />
                                            </>
                                        )}
                                    </div>
                                );
                            } else if (msg.type === "sysMessage") {
                                return (
                                    <div
                                        key={msg._id}
                                        className="bg-blue-400 p-3"
                                    >
                                        <div className="flex items-center content-center">
                                            <p className="font-bold">System</p>
                                            <p className="ml-2 text">- {formatUnixToLocalTime(msg.sentAt)}</p>
                                        </div>
                                        <br />
                                        {msg.message ? (
                                            <p className="text-ellipsis overflow-hidden seeMoreText">{msg.message}</p>
                                        ) : (
                                            <>
                                                <p className='opacity-50'>Blank</p>
                                                <br />
                                            </>
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>

                )}
                <form onSubmit={createChatSubmit} className='relative bottom-0 m-2'>
                    <label htmlFor='message'>Message:</label>
                    <br />
                    <input name='message' placeholder='Hi!' onChange={(e) => setMessage(e.target.value)} value={message} className='rounded-xl p-1 w-[94%] text-black focus:outline-none' type="text" id='message'></input >
                    <input name='submit' className='rounded-xl p-1 border-2 ml-2 focus:outline-none w-[5%]' type="submit" id='submit'></input >
                </form>
            </div>
        </>

    );
}

function MsgsFallback() {
    const userPlaceholders = 12;
    return (<>
        <div className={`${jetbrains_400weight.className}`}>
            {Array.from({ length: userPlaceholders }, (_, index) => (
                <div key={index + 1}>
                    <TemplateMsg />
                </div>
            ))}
        </div>
    </>)
}

function TemplateMsg() {
    return (<div className="backdrop-filter backdrop-blur-md border-white border-2 skeleton rounded-2xl w-[1/4] m-3 p-3 shrink">
        <div className="flex items-center content-center">
            <div className="rounded-full skeleton-avatar bg-red-500 pfp">
                <div className="glimmer-line"></div>
            </div>
            <div className="w-[100] ml-2 rounded-xl skeleton-title bg-red-500 h-[25]">
            </div>
        </div>
        <br />
        <div className="w-[300] ml-2 rounded-xl skeleton-text bg-red-500 h-[25]">
        </div>
        <br />
    </div>)
}