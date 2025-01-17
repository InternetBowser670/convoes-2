import { MongoClient, ServerApiVersion } from "mongodb";

export const dynamic = 'force-dynamic';

export async function getChatData(chatName: string) {

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

  let db;
  if (useProdDB) {
    db = client.db("InternetBowser-Prod");
  } else {
    db = client.db(process.env.MONGODB_DB_NAME);
  }

  const users = db.collection("chats");
  const chatDoc = await users.findOne( { chatName } )

  if (!chatDoc) {
    await client.close
    return
  }


  await client.close();
  return ( { chatName: chatDoc.chatName, usersAdded: chatDoc.usersAdded, privacyOption: chatDoc.privacyOption } )
}
