"use client";

import React, { useState, useEffect } from 'react';
import { Chat } from "@/app/lib/types";
import { JetBrains_Mono } from "next/font/google";
import TextWithSeeMore from '@/ui/text-with-see-more';
import { UserGroupIcon } from '@heroicons/react/24/solid';

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


export default function Page() {

    const [data, setData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/allchats`, {
                method: "GET",
            });
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserChats = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/getuserchats`, {
                method: "GET",
            });
            const data = await response.json();
            console.log(data.chats)
            setChatData(data.chats || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateAllData = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/getuserchats`, {
                method: "GET",
            });
            const data = await response.json();
            setChatData(data.chats || []);
            const chatsResponse = await fetch(`${baseUrl}/api/allchats`, {
                method: "GET",
            });
            const chatsData = await chatsResponse.json();
            setData(chatsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUserChats();
        setInterval(updateAllData, 15000);
    }, []);

    function joinchat(chatname: string) {
        fetch(`${baseUrl}/api/joinchat`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatName: chatname })
        })
            .then(async response => {
                const data = await response.json();
                if (response.ok) {
                    alert("Successfully joined Convo");
                    updateAllData();
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
            .catch(error => {
                console.error('Error joining chat:', error);
                alert("An error occurred while joining the chat.");
            });
    }



    return (
        <div className={`${jetbrains_400weight.className}`}>
            {isLoading ? (
                <ChatsFallback/>
            ) : (
                <div className={`grid grid-cols-3`}>
                    {data.map((chat: Chat) => (
                        <div key={chat._id} className="backdrop-filter text-white backdrop-blur-md border-white border-2 overflow-hidden max-height-[100px] rounded-2xl w-[1/4] m-3 p-3 shrink">
                            <div className="flex items-center justify-between content-center">
                                <div className={`flex`}>
                                    <TextWithSeeMore maxLength={19} text={chat.chatName} className='font-bold'/>
                                    {
                                        // @ts-expect-error this is literally hard cap
                                        chatData.includes(chat.chatName) ? <div
                                                className={`ml-3 text-blue-700 bg-white rounded-2xl text-sm p-[2px] content-center`}
                                                >Joined</div>
                                            : <button
                                                className={`ml-3 border-white hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 p-[2] px-3`}
                                                onClick={() => joinchat(chat.chatName)}>Join</button>
                                    }

                                </div>

                                <div className='flex px-2'>
                                    <UserGroupIcon fill='white' stroke='white' className='mr-2' height={"20px"}/>
                                    <p> {chat.usersAdded} </p>
                                </div>
                            </div>
                            <br />
                            {chat.chatDesc ? (
                                <TextWithSeeMore text={chat.chatDesc} maxLength={26} className='text-ellipsis overflow-hidden seeMoreText'/>
                            ) : (
                                <>
                                    <p>Desc: (N/A)</p>
                                    <br />
                                </>
                            )}
                            <br />
                            <p className="font-bold">
                                Owner: {chat.ownerUsername}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ChatsFallback() {
    const chatPlaceholders = 12;
    return (<>
        <div className={`${jetbrains_400weight.className} grid grid-cols-3`}>
            {Array.from({ length: chatPlaceholders }, (_, index) => (
                <div key={index + 1}>
                    <TemplateChat />
                </div>
            ))}
        </div>
    </>)
}

function TemplateChat() {
    return (<div
        className="backdrop-filter backdrop-blur-md border-white border-2 skeleton rounded-2xl w-[1/4] m-3 p-3 shrink">
        <div className="flex justify-between items-center content-center">
            <div className="w-[250px] ml-2 rounded-xl skeleton-title bg-red-500 h-[25]">
            </div>
            <div className=" w-[50px] ml-2 rounded-xl skeleton-title bg-red-500 h-[25]">
            </div>
        </div>
        <br/>
        <div className="w-[300] ml-2 rounded-xl skeleton-text bg-red-500 h-[25]">
        </div>
        <br/>
        <div className="w-[250px] ml-2 rounded-xl skeleton-title bg-red-500 h-[25]">
        </div>
    </div>)
}