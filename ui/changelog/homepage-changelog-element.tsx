import { JetBrains_Mono } from "next/font/google";
import { Version } from "@/app/lib/types";

const jetbrains_400weight = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
});

const jetbrains_800weight = JetBrains_Mono({
  weight: "800",
  subsets: ["latin"],
});

const jetbrains_600weight = JetBrains_Mono({
  weight: "600",
  subsets: ["latin"],
});

export default function HomepageChangelogEl(props: Version) {
  const vername = props.vername || "0.2.8";
  const changes = props.changes || "Finalized version indicator position";
  const date = props.date || "12/4/24"
  const changeType = props.changeType || "site"

  return (
    <>
      <div className="justify-self-center self-center backdrop-filter backdrop-blur-md border-2 w-1/2 p-5 rounded-2xl flex flex-col justify-center content-center border-white border-solid m-2">

        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <h1 className={"text-2xl" + " " + jetbrains_800weight.className}>
                {vername} 
                {changeType === "site" ? (
                     <span>
                        ​ (Site Update)
                     </span>
                  ) : changeType === "convoes" ? (
                    <span>
                        ​ (Convoes Update)
                     </span>
                  ) : null
                } 
              </h1>
              <p className={"text-lg relative left-3 text-slate-400" + " " + jetbrains_600weight.className}>
                {" " + "- " + date}
              </p>
            </div>
          </div>
          <div>
            <br />
            <p className={"text-lg" + " " + jetbrains_400weight.className}>
              {changes}
            </p>
          </div>  
        </div>
      </div>
    </>
  );

}