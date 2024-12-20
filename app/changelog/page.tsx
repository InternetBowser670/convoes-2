import { JetBrains_Mono } from "next/font/google";
import ChangelogElements from "@/ui/changelog/changelog-elements";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

export default function Page() {
    return (
        <>
            <main>
                <div className="flex flex-col content-center justify-center">
                    <div className="flex justify-center items-center">
                        <div>
                            <h1
                                className={
                                    "text-3xl" + " " + jetbrains_800weight.className
                                }
                            >
                                Changelog
                            </h1>
                            <br />
                            <p className={"" + " " + jetbrains_400weight.className}>
                                See updates to this website
                            </p>
                        </div>
                    </div>
                    <br />
                    <ChangelogElements />
                    <br />
                    <br />
                </div>
            </main>
        </>
    );
}
