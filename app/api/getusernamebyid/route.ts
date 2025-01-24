import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const useProdDB = false;
  
  const { mainDb } = await connectToDatabases(useProdDB);

  const users = mainDb.collection("users");

  const body = await new Response(req.body).json()
  
  const requestedId = body.id;

  if (!requestedId) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const user = await users.findOne({ id: requestedId });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ username: user.username }, { status: 200 });
}
