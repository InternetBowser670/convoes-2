import { Webhook } from 'svix'
import { headers } from 'next/headers'
import {  WebhookEvent } from '@clerk/nextjs/server'

import { MongoClient, ServerApiVersion } from 'mongodb'
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





export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type
  console.log(`Received webhook with event type of ${eventType}`)

  try {
    if (eventType === "user.created") {
      const result = await users.insertOne(evt.data);
      console.log(
          `A document was inserted with the _id: ${result.insertedId}`,
      );
    } else if (eventType === "user.deleted") {
      const deleteResult = await users.deleteOne({ id: evt.data.id });
      console.log(
        `A document was deleted ${deleteResult.deletedCount} times`,
      );
    } else if (eventType === "user.updated") {
      const userData = evt.data
      const updateResult = await users.updateOne( { id: evt.data.id },
        { $set: userData });
      console.log(
        `A document was updated ${updateResult.modifiedCount} times`,
      );
    }
  } catch (error) {
    console.error("Error updating Firebase:", error);
    return new Response("Error updating Firebase", { status: 500 });
  }


  console.log("Webhook Recieved")

  return new Response('Webhook received', { status: 200 })
}