import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";
import { getUsernameById } from "@/app/lib/funcs/getusernamebyid";

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
  const useProdDB = false;

  await client.connect();

  let db;
  if (useProdDB) {
    db = client.db("InternetBowser-Prod");
  } else {
    db = client.db(process.env.MONGODB_DB_NAME);
  }
  const chats = db.collection("chats");
  const allChats = await chats.find( { privacyOption: "public" } ).sort({ "priority": -1, "usersAdded": -1 }).toArray();

  const serializedChats = await Promise.all(
    allChats.map(async (chat) => {
      const ownerUsername = await getUsernameById(chat.ownerId);
      return {
        _id: chat._id.toString(),
        chatName: chat.chatName,
        privacyOption: chat.privacyOption,
        chatPassword: chat.chatPassword,
        chatDesc: chat.chatDesc,
        createdBy: chat.createdBy,
        ownerId: chat.ownerId,
        ownerUsername: ownerUsername,
        usersAdded: chat.usersAdded
      };
    })
  );
  
  await client.close
  return NextResponse.json(serializedChats);
}
