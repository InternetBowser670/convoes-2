import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getChatData } from '@/app/lib/funcs/getChatData'

export const dynamic = 'force-dynamic';

export async function GET() {

  const dashboardData = []

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ status: 401 });
  }

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
  const userDoc = await users.findOne( { id: user.id } )

  if (!userDoc) {
    await client.close
    return NextResponse.json({ status: 401 });
  }

  const userChats = await userDoc.chats.sort()

  for (let i = 0; i < userChats.length; i++) {
    dashboardData.push(await getChatData(userChats[i]))
  }
  
  console.log(dashboardData)

  await client.close();
  return NextResponse.json(dashboardData);
}
