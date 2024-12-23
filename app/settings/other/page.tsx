import { JetBrains_Mono } from "next/font/google"

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function Page() {
    return(<>
        <div className={`w-full h-full flex justify-center items-center flex-col content-center ${jetbrains_400weight.className}`}>
            <div className="bg-blue-700 border-white rounded-3xl border-2 p-5">
                <p>
                    Sorry, I haven&#39;t finished this yet.
                </p>
            </div>
        </div>
    </>)
}