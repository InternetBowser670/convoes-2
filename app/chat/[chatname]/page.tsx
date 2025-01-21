import { currentUser } from "@clerk/nextjs/server";
import { jetbrains_400weight } from "@/app/fonts/fonts";
import ChatContainer from "@/ui/convo/chat-container";

export default async function Page({
    params,
  }: {
    params: Promise<{ chatname: string }>
  }) {
  const user = await currentUser();

  if (!user) {
    return (
      <div className={`${jetbrains_400weight.className}`}>
        Not signed in
      </div>
    );
  }

  const chatname = decodeURIComponent((await params).chatname);

  return (
    <div className={`${jetbrains_400weight.className}`}>
      <h1 className="text-3xl font-bold">Convo - &#34;{chatname}&#34;</h1>
      <ChatContainer userId={user.id} chatname={chatname} />
    </div>
  );
}
