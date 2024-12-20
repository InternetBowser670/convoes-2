import { JetBrains_Mono } from "next/font/google";

const jetbrains_800weight = JetBrains_Mono({
  weight: "800",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col justify-center">
        <div className="p-[200px] border-white border-2 border-solid rounded-[100px]">
          <h1 className={"text-5xl" + " " + jetbrains_800weight.className}>
            Convoes 2 - Coming Soon!
          </h1>
          <br />
          <p className={"text-2xl max-w-60%" + " " + jetbrains_800weight.className}>
            Create an account and visit <a className="underline" href="https://www.internetbowser.com">my website</a> until this service becomes available
          </p>
        </div>
      </main>
    </div>
  );
}
