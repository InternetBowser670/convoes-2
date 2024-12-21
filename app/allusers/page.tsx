import { MongoClient, ServerApiVersion } from 'mongodb'
import { JetBrains_Mono } from "next/font/google";

const jetbrains_400weight = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
});

const uri = process.env.MONGODB_URI || "lol ggs";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    tls: true, // Enforce TLS
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




await client.connect();

const db = client.db(process.env.MONGODB_DB_NAME)
const users = db.collection("users")
const allUsers = await users.find().toArray();



export default function Page() {
    return (<>
        <ul className={`${jetbrains_400weight.className}`}>
            {allUsers.map(user => (
                <li key={user.id}>
                    <p>Name: {user.first_name}</p>
                    <p>Username: {user.username}</p>
                    <br />
                </li>
            ))}
        </ul>
    </>)
}