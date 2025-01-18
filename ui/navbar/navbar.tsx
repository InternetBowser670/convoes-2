"use client";

import { HomeIcon, UsersIcon, ArchiveBoxIcon, CurrencyDollarIcon, Cog6ToothIcon, MapIcon } from '@heroicons/react/24/solid'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { JetBrains_Mono } from "next/font/google";
import clsx from "clsx";
import Link from "next/link";
import Pfp from "../homepage/pfp";
import { usePathname } from "next/navigation";
import NavbarChatsIcon from "@/ui/navbar/convoes-chats-icon"

const jetbrains_800weight = JetBrains_Mono({
    weight: "800",
    subsets: ["latin"],
});

export default function Navbar() {
    const links = [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Chats", altLinks: ["/createchat", "/joinchat", "/dashboard", "/chat"], useDiv: true, href: "/allchats", icon: NavbarChatsIcon },
        { name: "Users", href: "/allusers", icon: UsersIcon },
        { name: "Changelog", href: "/changelog", icon: ArchiveBoxIcon },
        { name: "Donate", href: "https://www.buymeacoffee.com/internetbowser", icon: CurrencyDollarIcon },
        { name: "Roadmap", href: "/roadmap", icon: MapIcon },
        { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
    ];

    const pathname = usePathname();

    return (
        <>

            <div className={jetbrains_800weight.className +
                " " + "flex sm:flex w-full justify-center mb-5 overflow-hidden"}>
                <div className="backdrop-filter backdrop-blur-md fixed z-10 justify-center border-solid rounded-2xl min-w-500 flex content-center h-9 m-5 p-5 border-white border-2">
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
                                        {
                                            !!link.useDiv ? (
                                                <div
                                                    key={link.name}
                                                    className={clsx(
                                                        jetbrains_800weight.className +
                                                        " " +
                                                        "p-1 relative rounded-2xl divNavbarLink",
                                                        {
                                                            "text-[#fffc36]":
                                                                (pathname.includes(link.href) && link.href !== "/") || (pathname === link.href || link.altLinks.includes(pathname))
                                                        },
                                                    )}

                                                >
                                                    {link.icon ? (
                                                        <link.icon aria-label={link.name} />
                                                    ) : (
                                                        <p>{link.name}</p>
                                                    )}
                                                </div>
                                            )
                                                : (<Link
                                                    key={link.name}
                                                    href={link.href}
                                                    className={clsx(
                                                        jetbrains_800weight.className +
                                                        " " +
                                                        "p-1 relative rounded-2xl nonDivNavbarLink",
                                                        {
                                                            "text-[#fffc36]":
                                                                (pathname.includes(link.href) && link.href !== "/") || pathname === link.href
                                                        },
                                                    )}

                                                >
                                                    {link.icon ? (
                                                        <link.icon className="h-6 w-6" aria-label={link.name} />
                                                    ) : (
                                                        <p>{link.name}</p>
                                                    )}
                                                </Link>)
                                        }

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
