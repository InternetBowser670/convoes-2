"use client";
import { JetBrains_Mono } from "next/font/google";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});




export default function Page() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
        }

        fetchUsers();
    }, []);

    return (
        <>
            <div className={`grid grid-cols-3 ${jetbrains_400weight.className}`}>
                {users.map(user => (
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
        </>
    );
}
