import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {

    const user = await currentUser()

    const currentTime = Date.now()

    if (!user) {
        return NextResponse.json({ message: 'You must sign in to send a message' },
            { status: 401 })
    }

    const body = await new Response(req.body).json()

    const chatname = body.chatName;
    const message = body.message;

    const useProdDB = false;

    const { convoesDb, mainDb } = await connectToDatabases(useProdDB);

    const chatCollection = convoesDb.collection(chatname)
    const users = mainDb.collection("users");

    const userDoc = await users.findOne({ id: user.id });

    const userChats = userDoc?.chats || []

    if (!userChats.includes(chatname)) {
        return NextResponse.json({ message: 'You are not part of that Convo' },
            { status: 400 })
    } else {
        await users.updateOne({id: user.id}, {$inc: { messagesSent: 1 }})
    }

    await chatCollection.insertOne({type: "textMessage", message: message, userId: user.id, imageUrl: user.imageUrl, username: user.username, sentAt: currentTime})

    return NextResponse.json({ status: 200 })
}
