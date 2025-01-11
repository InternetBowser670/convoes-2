import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";

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

    const user = await currentUser()

    if (!user) {
        await client.close()
        return NextResponse.json({ message: 'Unauthorized' },
            { status: 401 })
    }

    const chats = db.collection("chats");
    const users = db.collection("users");

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
            await client.close()
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
                await client.close()
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
        await client.close()
        return NextResponse.json({ message: 'There is no Convo with that name' },
            { status: 400 })
    }

    await client.close()
    return (NextResponse.json({ message: 'Success' },
        { status: 200 }))
}