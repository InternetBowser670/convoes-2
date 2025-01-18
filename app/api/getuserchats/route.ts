import { getUserChats } from "@/app/lib/funcs/getUserChats";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

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
