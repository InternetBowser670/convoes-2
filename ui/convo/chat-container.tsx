"use client";

import { useState, useEffect } from "react";

export default function ChatContainer({
  userId,
  chatname,
}: {
  userId: string;
  chatname: string;
}) {
  const [userChats, setUserChats] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await fetch(`/api/getuserchats`);
        const data = await response.json();
        setUserChats(data.userChats);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    };

    fetchUserChats();
  }, [userId]);

  if (userChats === null) {
    return <p>Loading your chats...</p>;
  }

  if (userChats.includes(chatname)) {
    return (
      <p>
        You are part of this Convo! Your Convoes: {userChats.join(", ")}
      </p>
    );
  } else {
    return <p>You are not part of this Convo</p>;
  }
}
