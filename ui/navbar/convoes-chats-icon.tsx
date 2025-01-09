"use client";

import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid'
import { JetBrains_Mono } from "next/font/google";
import Link from 'next/link';
import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { PlusCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

export default function NavbarChatsIcon() {

    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const toggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible);
    };


    const pathname = usePathname();

    return (
        <div className={`${jetbrains_800weight.className} relative inline-block group`}>
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" onClick={toggleTooltip} />
            {/*{isTooltipVisible && (*/}
            <div className={`border-white tooltip ${isTooltipVisible ? 'visible' : ''} border-2 rounded-2xl text-white w-[250px] p-2 mt-2 top-[30] bg-blue-700 backdrop-filter backdrop-blur-md absolute`}>
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
            {/*)}*/}
        </div>
    )
}