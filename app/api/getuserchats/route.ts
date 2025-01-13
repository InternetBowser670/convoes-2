import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic';

export async function GET() {
    const user = await currentUser()
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
    const db = useProdDB ? client.db("InternetBowser-Prod") : client.db(process.env.MONGODB_DB_NAME);
    const users = db.collection("users");

    const requestedId = user?.id

    if (!requestedId) {
        await client.close()
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const userDoc = await users.findOne({ id: requestedId });

    if (!userDoc) {
        await client.close()
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await client.close()
    return NextResponse.json({ chats: userDoc.chats }, { status: 200 });
}
