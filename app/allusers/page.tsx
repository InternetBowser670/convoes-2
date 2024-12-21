import { MongoClient, ServerApiVersion } from "mongodb";
import { JetBrains_Mono } from "next/font/google";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

interface User {
    _id: string; // MongoDB ID, converted to string
    username: string;
    first_name?: string; // Optional fields
    last_name?: string;
    image_url?: string;
}


// Function to fetch data from MongoDB
async function fetchUsers(): Promise<User[]> {
    const uri = process.env.MONGODB_URI || "lol ggs";
    const client = new MongoClient(uri, {
        tls: true,
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    const useProdDB = true;

    await client.connect();
    let db;
    if (useProdDB) {
        db = client.db("InternetBowser-Prod");
    } else {
        db = client.db(process.env.MONGODB_DB_NAME);
    }
    const users = db.collection("users");
    const allUsers = await users.find({}).sort({ priority: -1 }).toArray();

    return allUsers.map(user => ({
        _id: user._id.toString(),
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        image_url: user.image_url,
    }));
}



export default async function Page() {
    const allUsers: User[] = await fetchUsers();

    return (
        <>
            <div className={`grid grid-cols-3 ${jetbrains_400weight.className}`}>
                {allUsers.map(user => (
                    <div key={user._id} className="bg-blue-700 border-white border-2 rounded-2xl w-[500] m-3 p-3 shrink">
                        <div className="flex items-center content-center">
                            <img
                                src={
                                    user.image_url ||
                                    "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycGw2MWhCQlZzTEJPeVpPMDJmUkQ2TExoQzQiLCJyaWQiOiJ1c2VyXzJxWDQyMERNZno2RHFnbkJTckQxWGowbFpxUiIsImluaXRpYWxzIjoiQVgifQ"
                                }
                                className="rounded-full pfp"
                                alt={`${user.username}'s pfp`}
                            />
                            <p>​ @{user.username}</p>
                        </div>
                        <br />
                        {user.first_name ? (
                            <p>
                                Name: {user.first_name} {user.last_name}
                            </p>
                        ) : (
                            <p>Name: (N/A)</p>
                        )}
                        <br />
                    </div>
                ))}
            </div>
        </>
    );
}
