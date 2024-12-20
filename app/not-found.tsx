import { JetBrains_Mono } from "next/font/google";
import Link from 'next/link'
 
const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div className='w-full h-full flex justify-center content-center'>
        <div className="border-red-60 h-1/2 border-2 flex flex-shrink flex-col p-5 border-solid rounded-3xl">
            <h2 className={"text-4xl truncate  sm:text-5xl md:text-6xl lg:text-7xl text-ellipsis" +
                        " " +
                        jetbrains_800weight.className}>Error 404:</h2>
            <p className={"text-4xl truncate  sm:text-5xl md:text-6xl lg:text-7xl text-ellipsis" +
                        " " +
                        jetbrains_800weight.className}>Could not find requested file</p>
            <br />
            <Link className={"text-xl truncate underline sm:text-5xl md:text-6xl lg:text-7xl text-ellipsis" +
                        " " +
                        jetbrains_400weight.className} href="/">Return Home</Link>
        </div>
    </div>
  )
}