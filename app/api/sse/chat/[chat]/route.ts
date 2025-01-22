import { NextRequest } from 'next/server';

type Connection = {
  id: string;
  username: string;
  profilePicture: string;
  send: (data: string) => void;
  close: () => void;
};

const connections: Record<string, Set<Connection>> = {};

export async function GET(req: NextRequest, context: { params: Promise<{ chat: string }> }) {
  const chatname = await (await context.params).chat; // No need for await here

  if (!connections[chatname]) {
    connections[chatname] = new Set();
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const username = searchParams.get('username');
  const profilePicture = searchParams.get('profilePicture');

  if (!id || !username || !profilePicture) {
    return new Response(JSON.stringify({ error: 'Missing required query parameters' }), { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      };

      const close = () => {
        controller.close();
      };

      const connection: Connection = { id, username, profilePicture, send, close };
      connections[chatname].add(connection);

      req.signal.addEventListener('abort', () => {
        connections[chatname].delete(connection);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

export async function POST(req: NextRequest, context: { params: Promise<{ chat: string }> }) {
  const chatname = await (await context.params).chat;

  if (!connections[chatname] || connections[chatname].size === 0) {
    return new Response(JSON.stringify({ error: 'No active connections' }), { status: 404 });
  }

  const body = await req.json();
  const { id, username, profilePicture, message } = body;

  if (!id || !username || !profilePicture || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields in the request body' }), { status: 400 });
  }

  const data = JSON.stringify({
    id,
    username,
    profilePicture,
    message,
    timestamp: new Date().toISOString(),
  });

  // Broadcast the message to all clients in the chat
  connections[chatname].forEach((connection) => {
    connection.send(data);
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
