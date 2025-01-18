import { getUserChats } from "@/app/lib/funcs/getUserChats";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const userChats = await getUserChats(userId);
    return NextResponse.json({ userChats });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}
