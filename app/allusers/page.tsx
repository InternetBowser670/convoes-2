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
                    <div className='bg-blue-700 border-white border-2 rounded-2xl w-[500] p-3 shrink'>
                        <div className='flex items-center content-center'>
                            <img src={user.image_url} className='rounded-full pfp' alt={`${user.username}'s pfp`}>
                            </img>
                            <p>​    @{user.username}</p>
                        </div>
                        {
                            user.first_name ?  <p>Name: {user.first_name} {user.last_name}</p>
                            : <p>Name: (N/A)</p>
                        }
                       
                        
                        <br />
                    </div>
                </li>
            ))}
        </ul>
    </>)
}