"use client";

import { useState, useEffect, useMemo } from 'react';
import { MessageDocument } from "@/app/lib/types";
import { JetBrains_Mono } from "next/font/google";

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
    const date = new Date(unixTimestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
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

    const sendMessage = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!message) {
            alert("Please enter a message");
            return;
        }

        try {

            // Sync message with MongoDB
            await fetch(`${baseUrl}/api/sendmessage`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatName: chatname,
                    message: message,
                }),
            });

            scrollToBottom()

            setMessage("");
            scrollToBottom();
        } catch (e) {
            console.log(e)
            alert("Message failed to sync");
        }
    };


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
        setInterval(updateMessages, 1000);
    }, []);

    const GROUP_THRESHOLD_MS = 5 * 60 * 1000; //5s

    const groupedData = useMemo(() => {
        // group adjacent messages by user and time
        return data
            .sort((a, b) => a.sentAt - b.sentAt)
            .reduce((groups, msg, index) => {
                if (index === 0 || msg.type === "sysMessage") {
                    groups.push([msg]); // start a new group for sysMessages or the first message
                } else {
                    const lastGroup = groups[groups.length - 1];
                    const lastMessage = lastGroup[lastGroup.length - 1];

                    if (
                        msg.type === "textMessage" &&
                        lastMessage.type === "textMessage" &&
                        msg.userId === lastMessage.userId &&
                        msg.sentAt - lastMessage.sentAt < GROUP_THRESHOLD_MS
                    ) {
                        lastGroup.push(msg);
                    } else {
                        groups.push([msg]);
                    }
                }
                return groups;
            }, [] as MessageDocument[][]);
    }, [data]);


    return (
        <>
            <div className="flex justify-end px-20">
                <button
                    onClick={updateMessages}
                    className={`border-white ml-2 hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 px-2 p-[2]`}
                >
                    Update
                </button>
            </div>
            <div
                className={`border-2 backdrop-filter backdrop-blur-md rounded-2xl m-10 mt-10 overflow-hidden ${jetbrains_400weight.className}`}
            >
                {isLoading ? (
                    <MsgsFallback />
                ) : (
                    <div id="messages" className="h-[550px] overflow-y-scroll">

                        {groupedData.map((group, groupIndex) => {
                            const isSystemMessage = group[0].type === "sysMessage";

                            if (isSystemMessage) {
                                return group.map((msg) => (
                                    <div key={msg._id} className="bg-blue-400 p-3">
                                        <div className="flex items-center content-center">
                                            <p className="font-bold">System</p>
                                            <p className="ml-2 text">
                                                - {formatUnixToLocalTime(msg.sentAt)}
                                            </p>
                                        </div>
                                        <br />
                                        {msg.message ? (
                                            <p className="text-ellipsis overflow-hidden seeMoreText">{msg.message}</p>
                                        ) : (
                                            <>
                                                <p className="opacity-50">Blank</p>
                                                <br />
                                            </>
                                        )}
                                    </div>
                                ));
                            } else {
                                return (
                                    <div key={groupIndex} className="mb-4">
                                        {/* Render the first message with user info */}
                                        <div className="rounded-2xl w-[1/4] p-2 shrink">
                                            <div className="flex items-center content-center">
                                                <img
                                                    src={
                                                        group[0].image_url ||
                                                        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycGw2MWhCQlZzTEJPeVpPMDJmUkQ2TExoQzQiLCJyaWQiOiJ1c2VyXzJxWDQyMERNZno2RHFnbkJTckQxWGowbFpxUiIsImluaXRpYWxzIjoiQVgifQ"
                                                    }
                                                    className="rounded-full pfp"
                                                    alt={`${group[0].username}'s pfp`}
                                                />
                                                <p className="ml-2">@{group[0].username}</p>
                                                <p className="ml-2 text">
                                                    - {formatUnixToLocalTime(group[0].sentAt)}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Render the rest of the group's messages without user info */}
                                        {group.map((msg) => (
                                            <div
                                                key={msg._id}
                                                className={`rounded-2xl w-[1/4] p-2 shrink ml-10`}
                                            >
                                                {msg.message ? (
                                                    <p className="text-ellipsis overflow-hidden seeMoreText">
                                                        {msg.message}
                                                    </p>
                                                ) : (
                                                    <p className="opacity-50">Blank</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
                <form onSubmit={sendMessage} className="relative border-t-2 bottom-0 p-2">
                    <label htmlFor="message">Message:</label>
                    <br />
                    <input
                        name="message"
                        placeholder="Hi!"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="rounded-xl p-1 w-[94%] text-black focus:outline-none"
                        type="text"
                        id="message"
                    />
                    <input
                        name="submit"
                        className="rounded-xl p-1 border-2 ml-2 focus:outline-none w-[5%]"
                        type="submit"
                        id="submit"
                    />
                </form>
            </div>
        </>
    );

}

function MsgsFallback() {
    const userPlaceholders = 3;
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
    return (<div className="backdrop-filter backdrop-blur-md skeleton w-[1/4] p-3 shrink">
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