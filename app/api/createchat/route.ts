import { NextRequest, NextResponse } from "next/server";
import { connectToDatabases } from "../../lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { ChatDocument } from '@/app/lib/types'

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {

    const useProdDB = false;

    const { mainDb } = await connectToDatabases(useProdDB);

    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' },
            { status: 401 })
    }

    const body = await new Response(req.body).json();

    const chatName = body.chatName;
    const privacyOption = body.privacyOption;
    const chatPassword = body.chatPassword;
    const chatDesc = body.chatDesc || `Welcome to ${chatName}`;
    const currentTime = Date.now()

    const chats = mainDb.collection("chats");
    const users = mainDb.collection("users");
    const chatCollection = mainDb.collection(chatName);

    const existingDocument = await chats.findOne({ chatName: chatName });

    if (!existingDocument) {
        //NESTED IF STATEMENTS??? (dont hate me)
        if (privacyOption == 'public') {
            chats.insertOne({ chatName, members: [user.id], privacyOption, chatDesc, createdById: user.id, ownerId: user.id, usersAdded: 1, createdAt: currentTime } as ChatDocument)
        } else if (privacyOption == 'private') {
            chats.insertOne({ chatName, privacyOption, members: [ user.id ], chatPassword, chatDesc, createdById: user.id, ownerId: user.id, usersAdded: 1, createdAt: currentTime } as ChatDocument)
        }
        await users.updateOne({ id: user.id },
            { $push: { chats: chatName }});
        await chatCollection.insertOne({type: "sysMessage", message: `This is the beginning of Convo "${chatName}"`, sentAt: currentTime})
    } else {
        return NextResponse.json({ message: 'Convo already exists with that name' },
            { status: 400 })
    }

    return (NextResponse.json({ message: 'Success' },
        { status: 200 }))

}