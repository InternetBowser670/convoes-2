import {NextRequest, NextResponse} from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import {currentUser} from "@clerk/nextjs/server";

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
        return new NextResponse({ message: 'Unauthorized' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chats = await db.collection("chats");

    const body = await new Response(req.body).json();

    const chatName = body.chatName;
    const privacyOption = body.privacyOption;
    const chatPassword = body.chatPassword;

    console.log(chatName, privacyOption, chatPassword);

    return new NextResponse("It Worked")
}