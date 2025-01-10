import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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
  const db = useProdDB ? client.db("InternetBowser-Prod") : client.db(process.env.MONGODB_DB_NAME);
  const users = db.collection("users");

  const body = await new Response(req.body).json()
  
  const requestedId = body.id;

  if (!requestedId) {
    await client.close()
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const user = await users.findOne({ id: requestedId });

  if (!user) {
    await client.close()
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  await client.close()
  return NextResponse.json({ username: user.username }, { status: 200 });
}
