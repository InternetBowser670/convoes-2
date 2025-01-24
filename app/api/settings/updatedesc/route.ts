"use server";

import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import { connectToDatabases } from "../../../lib/mongodb";


export async function POST() {

    const { userId } = await auth()

    const useProdDB = false;

    const { mainDb } = await connectToDatabases(useProdDB);

    const users = mainDb.collection("users");

    users.updateOne( { id: userId }, { $set: {desc: "case"} } )

    return NextResponse.json(
        { text: "Updated successfully." },
        { status: 200 },
    );
}
