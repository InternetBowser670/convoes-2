import { JetBrains_Mono } from "next/font/google";
import { LatestChangeElement } from "@/ui/changelog/changelog-elements";

const jetbrains_800weight = JetBrains_Mono({
  weight: "800",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex items-center justify-center p-10 relative bottom-[100px] ">
        <main className="flex flex-col justify-center">
          <div className="p-10 border-white border-2 bg-blue-700 border-solid rounded-[100px]">
            <h1 className={"text-5xl" + " " + jetbrains_800weight.className}>
              Convoes 2 - Coming Soon!
            </h1>
            <br />
            <p className={"text-2xl max-w-60%" + " " + jetbrains_800weight.className}>
              Create an account and visit <a className="underline" href="https://www.internetbowser.com">my website</a> until this service becomes available
            </p>
            <br />
            <p className={"text-2xl max-w-60%" + " " + jetbrains_800weight.className}>
              Look at all user accounts <a className="underline" href="https://convoes-2.internetbowser.com/allusers">here</a>
            </p>
            <br/ >
            <LatestChangeElement />
          </div>
        </main>
      </div>
    </>

  );
}
