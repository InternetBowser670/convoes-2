import { NextResponse } from "next/server";
import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET() {
  
  const useProdDB = true;


  const { mainDb } = await connectToDatabases(useProdDB);
  
  const users = mainDb.collection("users");
  const allUsers = await users.find({}).sort({ "priority": -1, "username": 1 }).toArray();

  const serializedUsers = allUsers.map(user => ({
    _id: user._id.toString(),
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    image_url: user.image_url,
    desc: user.desc,
  }));

  return NextResponse.json(serializedUsers);
}
