"use client";

import React, { useState, useEffect } from 'react';
import { JetBrains_Mono } from "next/font/google";
import { DashboardChatData } from '@/app/lib/types'
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { useUser } from '@clerk/nextjs'

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
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

    const { user } = useUser()


    const [publicChatData, setPublicChatData] = useState([]);
    const [privateChatData, setPrivateChatData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/dashboarddata`, {
                method: "GET",
            });
            const data = await response.json();

            for (const chat of data) {
                console.log(chat.privacyOption)
            }

            setPublicChatData(data.filter((chat: DashboardChatData) => chat.privacyOption == 'public'))
            setPrivateChatData(data.filter((chat: DashboardChatData) => chat.privacyOption == 'private'))
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className={`${jetbrains_400weight.className} text-3xl`}>
            <h1 className={`${jetbrains_800weight.className} text-3xl`}>
                {`Welcome, ${user?.username || ""}`}
            </h1>
            <br />
            {isLoading || !publicChatData || !privateChatData ? (
                <ChatsFallback />
            ) : (
                <>
                    <div className='backdrop-filter text-white backdrop-blur-md border-white border-2 overflow-hidden max-height-[100px] rounded-2xl w-[1/4] m-3 p-3 shrink'>
                        <div className='flex content-center justify-center'>
                            <p>Public Chats:</p>
                        </div>
                        <div className={`grid grid-cols-3`}>
                            {publicChatData.map((chat: DashboardChatData) => (<div key={chat.chatName} className="backdrop-filter text-white backdrop-blur-md border-white border-2 overflow-hidden max-height-[100px] flex justify-between rounded-2xl w-[1/4] m-3 p-3 shrink">
                                <p>
                                    {chat.chatName}
                                </p>
                                <div className='flex px-2'>
                                    <UserGroupIcon fill='white' stroke='white' className='mr-2' height={"20px"} />
                                    <p> {chat.usersAdded} </p>
                                </div>

                            </div>
                            ))}
                        </div>
                        <div className='flex content-center justify-center'>
                            <p>Private Chats:</p>
                        </div>
                        <div className={`grid grid-cols-3`}>
                            {privateChatData.map((chat: DashboardChatData) => (<div key={chat.chatName} className="backdrop-filter text-white backdrop-blur-md border-white border-2 overflow-hidden max-height-[100px] rounded-2xl w-[1/4] m-3 p-3 shrink flex justify-between">
                                <p>
                                    {chat.chatName}
                                </p>
                                <div className='flex px-2'>
                                    <UserGroupIcon fill='white' stroke='white' className='mr-2' height={"20px"} />
                                    <p> {chat.usersAdded} </p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function ChatsFallback() {
    const chatPlaceholders = 6;
    return (<>
        <div className='backdrop-filter text-white backdrop-blur-md border-2 flex justify-center flex-col content-center items-center overflow-hidden max-height-[100px] rounded-2xl m-3 p-3 shrink'>
            <div className="flex rounded-2xl items-center w-1/2 justify-center p-2 ">
                <div className="w-[250px] ml-2 rounded-xl skeleton-title bg-red-500 h-[25]">
                </div>
            </div>
            <br />
            <div className={`${jetbrains_400weight.className} grid grid-cols-3`}>
                {Array.from({ length: chatPlaceholders }, (_, index) => (
                    <div key={index + 1}>
                        <TemplateChat />
                    </div>
                ))}
            </div>
            <br />
            <div className="flex rounded-2xl items-center w-1/2 justify-center p-2 ">
                <div className="w-[250px] ml-2 rounded-xl skeleton-title bg-red-500 h-[25]">
                </div>
            </div>
            <br />
            <div className={`${jetbrains_400weight.className} grid grid-cols-3`}>
                {Array.from({ length: chatPlaceholders }, (_, index) => (
                    <div key={index + 1}>
                        <TemplateChat />
                    </div>
                ))}
            </div>
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
    </div>)
}