import { JetBrains_Mono } from "next/font/google";

export const jetbrains_800weight = JetBrains_Mono({
  weight: "800",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className={"text-5xl" + " " + jetbrains_800weight.className}>
          Convoes 2 - Coming Soon!
        </h1>
      </main>
    </div>
  );
}
