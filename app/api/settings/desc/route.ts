import { currentUser } from '@clerk/nextjs/server'
import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
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

    await client.connect();
    let db;
    if (useProdDB) {
        db = client.db("InternetBowser-Prod");
    } else {
        db = client.db(process.env.MONGODB_DB_NAME);
    }
    const users = db.collection("users");

    const body = await new Response(req.body).json();
    const desc = body.desc

    if (!user) {
        return "No user found"
    }

    console.log(user.id)

    const updateResult = await users.updateOne({ id: user.id },
        { $set: { desc } });

    console.log(
        `A document was updated ${updateResult.modifiedCount} times`,
    );

    return new NextResponse("It Worked")

}
