import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function getUsernameById(id: string) {

  const useProdDB = false;

  const { mainDb } = await connectToDatabases(useProdDB);

  const users = mainDb.collection("users");
  
  const requestedId = id;

  const user = await users.findOne({ id: requestedId });

  if (!user) {
    return "Deleted User";
  }

  return user.username;
}
