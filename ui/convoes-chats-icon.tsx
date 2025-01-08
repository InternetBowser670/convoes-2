"use client";

import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid'
import { JetBrains_Mono } from "next/font/google";
import Link from 'next/link';
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PlusCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

export default function NavbarChatsIcon() {

    const pathname = usePathname();

    return (
        <div className={`${jetbrains_800weight.className} group`}>
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
            <div className="opacity-0 border-white border-2 rounded-2xl text-white w-[250px] p-2 top-[40px] bg-blue-700 backdrop-filter backdrop-blur-md absolute z-100 group-hover:opacity-100 transition-opacity duration-300">
                <Link className={clsx(
                    jetbrains_800weight.className +
                    " " +
                    "p-1 relative rounded-2xl divNavbarLink",
                    {
                        "text-[#fffc36]":
                            (pathname.includes("/createchat")) || (pathname == "/createchat")
                    },
                )} href={"/createchat"}>
                    <PlusCircleIcon className="mr-2 inline h-6 w-6" />   Create a Convo
                </Link>
                <br />
                <br />
                <Link className={clsx(
                    jetbrains_800weight.className +
                    " " +
                    "p-1 relative rounded-2xl divNavbarLink",
                    {
                        "text-[#fffc36]":
                            (pathname.includes("/allchats")) || (pathname == "/allchats")
                    },
                )} href={"/allchats"}>
                    <ChatBubbleLeftIcon className="mr-2 inline h-6 w-6" />   View all public Convoes
                </Link>
            </div>
        </div>
    )
}