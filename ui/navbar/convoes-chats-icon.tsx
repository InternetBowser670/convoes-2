"use client";

import {ChatBubbleLeftEllipsisIcon} from '@heroicons/react/24/solid'
import {JetBrains_Mono} from "next/font/google";
import Link from 'next/link';
import clsx from "clsx";
import { useRouter } from 'next/navigation';
import {useState} from "react";
import {usePathname} from "next/navigation";
import {PlusCircleIcon, ChatBubbleLeftIcon} from '@heroicons/react/24/solid';

const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

export default function NavbarChatsIcon() {

    const router = useRouter();

    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const toggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible);
    };


    const pathname = usePathname();

    return (
        <div className={`${jetbrains_800weight.className} relative inline-block group`}>
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" onClick={toggleTooltip}/>
            {/*{isTooltipVisible && (*/}
            <div
                className={`border-white items-start flex flex-col content-start tooltip ${isTooltipVisible ? 'visible' : ''} border-2 rounded-2xl text-white w-[250px] p-2 mt-2 top-[30] bg-blue-700 backdrop-filter backdrop-blur-md absolute`}>
                <button onClick={() => {
                    toggleTooltip();
                    router.push('/createchat')
                }}
                        className={clsx(
                            jetbrains_800weight.className +
                            " " +
                            "p-1 relative rounded-2xl divNavbarLink",
                            {
                                "text-[#fffc36]":
                                    (pathname.includes("/createchat")) || (pathname == "/createchat")
                            },
                        )}>
                    <PlusCircleIcon className="mr-2 inline h-6 w-6"/> Create a Convo
                </button>
                <button onClick={() => {
                    toggleTooltip();
                    router.push('/allchats')
                }}
                        className={clsx(
                            jetbrains_800weight.className +
                            " " +
                            "p-1 relative rounded-2xl flex flex-start divNavbarLink",
                            {
                                "text-[#fffc36]":
                                    (pathname.includes("/allchats")) || (pathname == "/allchats")
                            },
                        )}>
                    <ChatBubbleLeftIcon className="inline h-6 w-6"/>
                        <p className={`right-[7] relative`}>View all public Convoes</p>

                </button>
            </div>
            {/*)}*/}
        </div>
    )
}