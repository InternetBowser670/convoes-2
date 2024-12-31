import { JetBrains_Mono } from "next/font/google"
import { HandRaisedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function Page() {
    return (
        <>
            <div className={`h-full w-full flex justify-center content-center items-center ${jetbrains_400weight.className}`}>
                <div className="backdrop-filter backdrop-blur-md w-[70%] border-white border-2 rounded-3xl p-3 flex flex-col justify-center items-center content-center">
                    <HandRaisedIcon height="150" color="#fff200" />
                    <br />
                    <h1 className="text-7xl"> STOP </h1>
                    <br />
                    <br />
                    <h1 className="text-3xl"> Are you trying to edit one of these attributes: </h1>
                    <br />
                    <div className="backdrop-filter backdrop-blur-md w-[70%] border-white border-2 rounded-xl p-3 flex flex-col justify-center items-center content-center">
                        <ul className="text-xl">
                            <li>
                                Username
                            </li>
                            <li>
                                Profile Picture
                            </li>
                            <li>
                                Name
                            </li>
                            <li>
                                Email
                            </li>
                            <li>
                                Sign-in methods
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div className="flex  p-3 w-[30%] justify-around">
                        <Link href="/settings/clerk">
                            <div className="rounded-3xl hover:border-white hover:border-2 hover:bg-blue-700 hover:text-white w-[150px] border-2 border-blue-700 flex justify-center py-3 m-3 bg-white text-blue-700">

                                <p>
                                    Yes
                                </p>

                            </div>
                        </Link>
                        <Link href="/settings/other">
                            <div className="rounded-3xl hover:border-white hover:border-2 hover:bg-blue-700 hover:text-white w-[150px] border-2 border-blue-700 flex justify-center py-3 m-3 bg-white text-blue-700">
                                <p>
                                    No
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}