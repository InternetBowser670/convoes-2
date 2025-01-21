import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

    const body = await request.json();
    const chatname = body.chatName;

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
        db = client.db(process.env.CONVOES_DB_NAME || "InternetBowser-Convoes-Dev");
    }

    const chatCollection = db.collection(chatname)

    const messages = await chatCollection.find().sort({createdAt: 1}).toArray();

    const serializedUsers = messages.map(msg => ({
        _id: msg._id.toString(),
        type: msg.type,
        message: msg.message,
        sentAt: msg.sentAt,
        image_url: msg.image_url,
    }));
    await client.close()
    return NextResponse.json(serializedUsers);
}
