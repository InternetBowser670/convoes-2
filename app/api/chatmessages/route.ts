import { connectToDatabases } from "../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getUsernameById } from '@/app/lib/funcs/getusernamebyid'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

    const body = await request.json();
    const chatname = body.chatName;

    const useProdDB = false;


    const { convoesDb } = await connectToDatabases(useProdDB);

    const chatCollection = convoesDb.collection(chatname)

    const messages = await chatCollection.find().sort({createdAt: 1}).toArray();

    

    const serializedUsers = await Promise.all(
        messages.map(async (msg) => ({
            _id: msg._id.toString(),
            type: msg.type,
            message: msg.message,
            sentAt: msg.sentAt,
            image_url: msg.imageUrl,
            userId: msg.userId,
            username: await getUsernameById(msg.userId),
        }))
    )

    return NextResponse.json(serializedUsers);
}
