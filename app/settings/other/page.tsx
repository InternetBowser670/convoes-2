import { JetBrains_Mono } from "next/font/google"
import { currentUser } from '@clerk/nextjs/server'
import DescEdit from "@/ui/settings/desc-form";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default async function Page() {

    const user = await currentUser()

    if (!user) return <div className={`w-full h-full flex justify-center items-center flex-col content-center ${jetbrains_400weight.className}`}>Not signed in</div>

    return(<>
        <div className={`w-full h-full flex justify-center items-center flex-col content-center ${jetbrains_400weight.className}`}>
            <div className="bg-blue-700 border-white rounded-3xl border-2 w-[70%] h-[80%] p-5">
                <p className="text-3xl">
                    Profile Settings
                </p>
                <br />
                <hr />
                <br />
                <p className="text-2xl">
                    Description
                </p>
                <br />
                <DescEdit />
            </div>
        </div>
    </>)
}