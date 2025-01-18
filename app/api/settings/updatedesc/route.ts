"use server";

import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server';


export async function POST() {

    const { userId } = await auth()
    const user = await currentUser()

    console.log(user)


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
        db = client.db("InternetBowser-Prod");
    } else {
        db = client.db(process.env.MONGODB_DB_NAME);
    }
    const users = db.collection("users");

    users.updateOne( { id: userId }, { $set: {desc: "case"} } )

    await client.close()
    return NextResponse.json(
        { text: "Updated successfully." },
        { status: 200 },
    );
}
