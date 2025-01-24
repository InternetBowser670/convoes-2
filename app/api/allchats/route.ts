import { connectToDatabases } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import { getUsernameById } from "@/app/lib/funcs/getusernamebyid";

export const dynamic = 'force-dynamic';

export async function GET() {
  const useProdDB = false;

  const { mainDb } = await connectToDatabases(useProdDB);

  const chats = mainDb.collection("chats");
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

  return NextResponse.json(serializedChats);
}
