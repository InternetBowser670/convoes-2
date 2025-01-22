import { JetBrains_Mono } from "next/font/google";
import { LatestChangeElement } from "@/ui/changelog/changelog-elements";
import VersionName from "@/ui/version-name";

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
          <div className="p-10 border-white border-2 backdrop-filter min-w-[55vw] backdrop-blur-md border-solid rounded-[100px]">
            <h1 className={"text-5xl" + " " + jetbrains_800weight.className}>
              Convoes 2 - Out now!
            </h1>
            <br />
            <p className={"text-2xl max-w-60%" + " " + jetbrains_800weight.className}>
              Most recent update:
            </p>
            <br />
            <LatestChangeElement />
          </div>
        </main>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex-grow-0 relative bottom-8 h-0 flex items-center justify-center">
        <footer className="relative bottom-0 h-0 w-full rounded-xl flex flex-row justify-between items-center">
          <VersionName />
        </footer>
      </div>
    </>

  );
}
