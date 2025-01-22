import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";

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


    let db;
    if (useProdDB) {
        db = client.db("InternetBowser-Convoes-Prod");
    } else {
        db = client.db(process.env.CONVOESDBNAME || "InternetBowser-Convoes-Dev");
    }

    let mainDb;
    if (useProdDB) {
        mainDb = client.db("InternetBowser-Prod");
    } else {
        mainDb = client.db(process.env.MONGODB_DB_NAME);
    }

    const chatCollection = db.collection(chatname)
    const users = mainDb.collection("users");

    const userDoc = await users.findOne({ id: user.id });

    const userChats = userDoc?.chats || []

    if (!userChats.includes(chatname)) {
        await client.close()
        return NextResponse.json({ message: 'You are not part of that Convo' },
            { status: 400 })
    }

    await chatCollection.insertOne({type: "textMessage", message: message, userId: user.id, imageUrl: user.imageUrl, username: user.username, sentAt: currentTime})

    await client.close()
    return NextResponse.json({ status: 200 })
}