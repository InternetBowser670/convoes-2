import { MongoClient, ServerApiVersion } from "mongodb";

export const dynamic = 'force-dynamic';

export async function getUsernameById(id: string) {
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
  const db = useProdDB ? client.db("InternetBowser-Prod") : client.db(process.env.MONGODB_DB_NAME);
  const users = db.collection("users");
  
  const requestedId = id;

  const user = await users.findOne({ id: requestedId });

  if (!user) {
    await client.close()
    return "Deleted User";
  }

  await client.close()
  return user.username;
}
