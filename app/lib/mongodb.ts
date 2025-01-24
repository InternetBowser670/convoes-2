import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedMainDb: Db | null = null;

export async function connectToDatabases(
  useProdDB: boolean
): Promise<{ client: MongoClient; convoesDb: Db; mainDb: Db }> {
  if (cachedClient && cachedDb && cachedMainDb) {
    return { client: cachedClient, convoesDb: cachedDb, mainDb: cachedMainDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in your environment variables.");
  }

  const client = new MongoClient(uri);
  await client.connect();

  const convoesDb = useProdDB
    ? client.db("InternetBowser-Convoes-Prod")
    : client.db(process.env.CONVOESDBNAME || "InternetBowser-Convoes-Dev");

  const mainDb = useProdDB
    ? client.db("InternetBowser-Prod")
    : client.db(process.env.MONGODB_DB_NAME || "InternetBowser-Convoes-Dev");

  // Cache the connections
  cachedClient = client;
  cachedDb = convoesDb;
  cachedMainDb = mainDb;

  return { client, convoesDb: convoesDb, mainDb };
}
