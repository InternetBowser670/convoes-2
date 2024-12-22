"use client";

import React, { useState, useEffect } from 'react';
import { User } from "@/src/lib/types";
import { JetBrains_Mono } from "next/font/google";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export const dynamic = 'force-dynamic';


let baseUrl: string;
const useProdUrl = true
if (useProdUrl) {
    baseUrl = "https://convoes-2.internetbowser.com"
} else {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://convoes-2.internetbowser.com"
}


export default function Page() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/users`);
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
        <div className={`${jetbrains_400weight.className}`}>
            {isLoading ? (
                <UsersFallback/>
            ) : (
                <div className={`grid grid-cols-3`}>
                    {data.map((user: User) => (
                        <div key={user._id} className="bg-blue-700 border-white border-2 rounded-2xl w-[500] m-3 p-3 shrink">
                            <div className="flex items-center content-center">
                                <img
                                    src={
                                        user.image_url ||
                                        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycGw2MWhCQlZzTEJPeVpPMDJmUkQ2TExoQzQiLCJyaWQiOiJ1c2VyXzJxWDQyMERNZno2RHFnbkJTckQxWGowbFpxUiIsImluaXRpYWxzIjoiQVgifQ"
                                    }
                                    className="rounded-full pfp"
                                    alt={`${user.username}'s pfp`}
                                />
                                <p>​ @{user.username}</p>
                            </div>
                            <br />
                            {user.first_name ? (
                                <p>
                                    Name: {user.first_name} {user.last_name}
                                </p>
                            ) : (
                                <p>Name: (N/A)</p>
                            )}
                            <br />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function UsersFallback() {
    const userPlaceholders = 12;
    return (<>
        <div className={`${jetbrains_400weight.className} grid grid-cols-3`}>
            {Array.from({ length: userPlaceholders }, (_, index) => (
                <div key={index + 1}>
                    <TemplateUser />
                </div>
            ))}
        </div>
    </>)
}

function TemplateUser() {
    return (<div className="bg-blue-700 border-white border-2 skeleton rounded-2xl w-[500] m-3 p-3 shrink">
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