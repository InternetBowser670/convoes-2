import { connectToDatabases } from "../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function getChatData(chatName: string) {

  const useProdDB = false;

  const { mainDb } = await connectToDatabases(useProdDB);

  const users = mainDb.collection("chats");
  const chatDoc = await users.findOne( { chatName } )

  if (!chatDoc) {
    return
  }

  return ( { chatName: chatDoc.chatName, usersAdded: chatDoc.usersAdded, privacyOption: chatDoc.privacyOption } )
}
