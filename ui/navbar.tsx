"use client";


import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from "react";
import { JetBrains_Mono } from "next/font/google";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

import Link from "next/link";
import Pfp from "./homepage/pfp";

export default function Navbar() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Changelog", href: "/changelog"},
        { name: "Donate", href: "https://pay.internetbowser.com" },
    ];

    const pathname = usePathname();

    return (
        <>
            
                <div className={jetbrains_800weight.className +
                        " " + "flex sm:flex w-full justify-center mb-5 overflow-hidden"}>
                    <div className="bg-blue-700 fixed z-10 justify-center border-solid rounded-2xl min-w-500 flex content-center h-9 m-5 p-5 border-white border-2">
                        <div className="relative bottom-4 flex flex-row w-15 h-8">
                            <div className="flex justify-center">
                                <a title='Main site' className="h-8 w-8 overflow-hidden" href="https://internetbowser.com">
                                    <Pfp size="2rem" />
                                </a>
                            </div>
                            <div className="flex flex-row justify-around px-3">
                                {links.map((link) => {
                                    return (
                                        <div
                                            className="flex flex-row mx-3 h-full justify-center"
                                            key={link.name}
                                        >
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={clsx(
                                                    jetbrains_800weight.className +
                                                        " " +
                                                        "p-1 relative rounded-2xl",
                                                    {
                                                        "text-red-600":
                                                            pathname === link.href,
                                                    },
                                                )}
                                                
                                            >
                                                <p>{link.name}</p>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='flex justify-center pl-3 border-l-2 border-solid border-slate-400'>
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                                
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
        </>
    );
}
