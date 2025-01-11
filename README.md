## *Convoes - Development*
*(why are you doing this)*

## Getting Started
First, update your .env.local file to contain all required environment variables

*what you need:*
- Clerk Auth Api Key
- MongoDB connection string
- Webhook Signing secret (from svix)

After that, your .env.local file should look similar like this:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=GET YOUR OWN
CLERK_SECRET_KEY=GET YOUR OWN
MONGODB_DB_NAME=InternetBowser-Dev
MONGODB_URI=GET YOUR OWN
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=dev
SIGNING_SECRET=GET YOUR OWN
CLERK_DEV_BROWSER_JWT=true
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!