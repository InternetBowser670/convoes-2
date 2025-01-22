//yes, ik its a js file, just hear me out

import { MongoClient, ServerApiVersion } from "mongodb";
import readline from 'readline';



async function getURI() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const uri = await new Promise((resolve) => {
        rl.question(`What's your Mongo URI? `, (answer) => {
            rl.close();
            resolve(answer);
        });
    });


    return uri
}



const useProd = process.argv[3];

const func = process.argv[2];

async function createCollectionForAllChats() {
    const reqURI = await getURI();


    const uri = await process.env.MONGODB_URI || await reqURI || "lol ggs";

    const client = new MongoClient(uri, {
        tls: true,
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();

    let useProdDB

    if (useProd == "true") {
        useProdDB = true;
    } else {
        useProdDB = false;
    }

    let db;
    let mainDb

    if (useProdDB == true) {
        mainDb = client.db("InternetBowser-Prod");
        db = client.db("InternetBowser-Convoes-Prod");
    } else {
        mainDb = client.db("InternetBowser-Dev");
        db = client.db(process.env.MONGODB_DB_NAME || "InternetBowser-Convoes-Dev");
    }

    const chats = mainDb.collection("chats")

    const cursor = await chats.find()

    let updatedCollections = 0

    for await (const doc of cursor) {
        const currentTime = Date.now()
        const chatName = doc.chatName

        const chatCollection = db.collection(chatName)
        await chatCollection.insertOne({ type: "sysMessage", message: `This is the beginning of Convo "${chatName}"`, sentAt: currentTime })

        updatedCollections++
    }

    console.log(`Updated ${updatedCollections} documents`)

    await client.close()
}

if (func == 'createCollectionForAllChats') {
    createCollectionForAllChats();
}

await client.close()