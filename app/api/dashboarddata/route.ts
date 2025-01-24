import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabases } from "../../lib/mongodb";
import { getChatData } from '@/app/lib/funcs/getChatData'
import { ChatDocument } from "@/app/lib/types";

export const dynamic = 'force-dynamic';

export const maxDuration = 15;

export async function GET() {

  const dashboardData = []

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ status: 401 });
  }

  const useProdDB = false;

  const { mainDb } = await connectToDatabases(useProdDB);

  const users = mainDb.collection("users");
  const userDoc = await users.findOne( { id: user.id } )

  if (!userDoc) {
    return NextResponse.json({ status: 401 });
  }

  const userChats = await userDoc.chats.sort((a: ChatDocument, b: ChatDocument) => b.usersAdded - a.usersAdded)

  for (let i = 0; i < userChats.length; i++) {
    dashboardData.push(await getChatData(userChats[i]))
  }

  dashboardData.sort((a, b) => {
    if (!a) {
      return 99999
    }
    if (!b) {
      return 99999
    }
    const aUsers = a.usersAdded || 0;
    const bUsers = b.usersAdded || 0;
    return bUsers - aUsers;
  });
  
  return NextResponse.json(dashboardData);
}
