import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function getUserChats(id: string) {
  
  const useProdDB = false;

  const { mainDb } = await connectToDatabases(useProdDB);

  const users = mainDb.collection("users");
  
  const requestedId = id;

  const user = await users.findOne({ id: requestedId });

  if (!user) {
    return "Server Error";
  }

  return user.chats;
}
