import { currentUser } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from "next/server";
import { connectToDatabases } from "../../../lib/mongodb";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const user = await currentUser()

    const useProdDB = false;

    const { mainDb } = await connectToDatabases(useProdDB);

    const users = mainDb.collection("users");

    const body = await new Response(req.body).json();
    const desc = body.desc

    if (!user) {
        return new NextResponse("No User Found")
    }

    console.log(user.id)

     await users.updateOne({ id: user.id },
        { $set: { desc } });

    return new NextResponse("It Worked")
}
