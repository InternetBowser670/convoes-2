import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
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
  const useProdDB = true;

    await client.connect();
    let db;
    if (useProdDB) {
        db = client.db("InternetBowser-Prod");
    } else {
        db = client.db(process.env.MONGODB_DB_NAME);
    }
    const users = db.collection("users");
    const allUsers = await users.find({}).sort({ priority: -1 }).toArray();

    const serializedUsers = allUsers.map(user => ({
        _id: user._id.toString(),
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        image_url: user.image_url,
    }));

  return NextResponse.json(serializedUsers);
}
