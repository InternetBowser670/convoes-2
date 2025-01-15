import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { ChatDocument } from '@/src/lib/types'

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {

    const uri = process.env.MONGODB_URI || "lol ggs";
    const client = new MongoClient(uri, {
        tls: true,
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();
    const useProdDB = false;

    await client.connect();
    let db;
    if (useProdDB) {
        db = client.db("InternetBowser-Prod");
    } else {
        db = client.db(process.env.MONGODB_DB_NAME);
    }

    const user = await currentUser();

    if (!user) {
        await client.close()
        return NextResponse.json({ message: 'Unauthorized' },
            { status: 401 })
    }

    const chats = db.collection("chats");
    const users = db.collection("users");

    const body = await new Response(req.body).json();

    const chatName = body.chatName;
    const privacyOption = body.privacyOption;
    const chatPassword = body.chatPassword;
    const chatDesc = body.chatDesc || `Welcome to ${chatName}`;

    const existingDocument = await chats.findOne({ chatName: chatName });

    if (!existingDocument) {
        //NESTED IF STATEMENTS??? (dont hate me)
        if (privacyOption == 'public') {
            chats.insertOne({ chatName, members: [user.id], privacyOption, chatDesc, createdById: user.id, ownerId: user.id, usersAdded: 1 } as ChatDocument)
        } else if (privacyOption == 'private') {
            chats.insertOne({ chatName, privacyOption, members: [ user.id ], chatPassword, chatDesc, createdById: user.id, ownerId: user.id, usersAdded: 1 } as ChatDocument)
        }
        await users.updateOne({ id: user.id },
            { $push: { chats: chatName }});
    } else {
        await client.close()
        return NextResponse.json({ message: 'Convo already exists with that name' },
            { status: 400 })
    }

    await client.close()
    return (NextResponse.json({ message: 'Success' },
        { status: 200 }))

}