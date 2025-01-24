import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { ChatDocument } from '@/app/lib/types'
import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {




    const useProdDB = false;

    const { mainDb } = await connectToDatabases(useProdDB);

    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ message: 'You must sign in to join a Convo' },
            { status: 401 })
    }

    const chats = mainDb.collection<ChatDocument>("chats");
    const users = mainDb.collection("users");

    const userDoc = await users.findOne({ id: user.id });

    const userChats = userDoc?.chats || []
    await users.updateOne(
        { id: user.id, chats: { $exists: false } },
        { $set: { chats: [] } }
    );

    const body = await new Response(req.body).json();

    const chatName = body.chatName;
    const reqPassword = body.password;

    const chatDoc = await chats.findOne({ chatName: chatName });

    if (chatDoc) {
        if (userChats.includes(chatName)) {
            return NextResponse.json({ message: 'You are already part of that Convo' },
                { status: 400 })
        }
        if (reqPassword) {
            //why am I triple nesting without documenting it? because I don't care
            if (reqPassword == chatDoc.chatPassword) {
                await users.updateOne({ id: user.id },
                    { $push: { chats: chatName }});
                await chats.updateOne(
                    { chatName: chatName },
                    {
                        $push: { members: user.id },
                        $inc: { usersAdded: 1 }
                    }
                );

            } else {
                return NextResponse.json({ message: 'Incorrect password' },
                    { status: 400 })
            }
        } else {
            if (chatDoc.privacyOption == "public") {
                await users.updateOne({ id: user.id },
                    { $push: { chats: chatName }});
                await chats.updateOne(
                    { chatName: chatName },
                    {
                        $push: { members: user.id },
                        $inc: { usersAdded: 1 }
                    }
                );

            }
        }
    } else {
        return NextResponse.json({ message: 'There is no Convo with that name' },
            { status: 400 })
    }

    return (NextResponse.json({ message: 'Success' },
        { status: 200 }))
}