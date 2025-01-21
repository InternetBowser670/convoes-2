"use client";

import { useState, useEffect } from "react";
import { ChatBox } from "./chat-box";

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
    return <p>Loading the Convo...</p>;
  }

  if (userChats.includes(chatname)) {
    return (
      <><ChatBox chatname={chatname} /></>

    );
  } else {
    return <p>You are not part of this Convo</p>;
  }
}
