warning: in the working copy of 'app/globals.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/layout.tsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/app/api/createchat/route.ts b/app/api/createchat/route.ts[m
[1mindex ff16e20..db1c566 100644[m
[1m--- a/app/api/createchat/route.ts[m
[1m+++ b/app/api/createchat/route.ts[m
[36m@@ -1,6 +1,6 @@[m
[31m-import {NextRequest, NextResponse} from "next/server";[m
[32m+[m[32mimport { NextRequest, NextResponse } from "next/server";[m
 import { MongoClient, ServerApiVersion } from "mongodb";[m
[31m-import {currentUser} from "@clerk/nextjs/server";[m
[32m+[m[32mimport { currentUser } from "@clerk/nextjs/server";[m
 [m
 export const dynamic = 'force-dynamic';[m
 [m
[36m@@ -30,19 +30,44 @@[m [mexport async function POST(req: NextRequest) {[m
     const user = await currentUser()[m
 [m
     if (!user) {[m
[31m-        return new NextResponse()[m
[32m+[m[32m        return NextResponse.json({ message: 'Unauthorized' },[m
[32m+[m[32m            { status: 401 })[m
     }[m
 [m
     // eslint-disable-next-line @typescript-eslint/no-unused-vars[m
[31m-    const chats = await db.collection("chats");[m
[32m+[m[32m    const publicChats = await db.collection("chats-public");[m
[32m+[m[32m    const privateChats = await db.collection("chats-private");[m
 [m
     const body = await new Response(req.body).json();[m
 [m
     const chatName = body.chatName;[m
     const privacyOption = body.privacyOption;[m
     const chatPassword = body.chatPassword;[m
[32m+[m[32m    const chatDesc = body.chatDesc || `Welcome to ${chatName}`;[m
 [m
[31m-    console.log(chatName, privacyOption, chatPassword);[m
[32m+[m[32m    let existingDocument;[m
 [m
[31m-    return new NextResponse("It Worked")[m
[32m+[m[32m    if (privacyOption == 'public') {[m
[32m+[m[32m        existingDocument = await publicChats.findOne({ chatName: chatName });[m
[32m+[m[32m    } else if (privacyOption == 'private') {[m
[32m+[m[32m        existingDocument = await privateChats.findOne({ chatName: chatName });[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    if (!existingDocument) {[m
[32m+[m[32m        //NESTED IF STATEMENTS??? (dont hate me)[m
[32m+[m[32m        if (privacyOption == 'public') {[m
[32m+[m[32m            publicChats.insertOne({ chatName, privacyOption, chatDesc, createdById: user.id, ownerId: user.id, usersAdded: "1" })[m
[32m+[m[32m        } else if (privacyOption == 'private') {[m
[32m+[m[32m            privateChats.insertOne({ chatName, privacyOption, chatPassword, chatDesc, createdById: user.id, ownerId: user.id, usersAdded: "1" })[m
[32m+[m[32m        }[m
[32m+[m[32m    } else {[m
[32m+[m[32m        console.log("chat already exists")[m
[32m+[m[32m        return NextResponse.json({ message: 'chat already exists with that name' },[m
[32m+[m[32m            { status: 401 })[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    console.log(chatName, privacyOption, chatPassword, user.username, chatDesc);[m
[32m+[m
[32m+[m[32m    return NextResponse.json({ message: 'It worked' },[m
[32m+[m[32m        { status: 200 })[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/app/createchat/page.tsx b/app/createchat/page.tsx[m
[1mindex 2e9e6e1..5def50d 100644[m
[1m--- a/app/createchat/page.tsx[m
[1m+++ b/app/createchat/page.tsx[m
[36m@@ -1,7 +1,7 @@[m
 "use client";[m
 [m
[31m-import {JetBrains_Mono} from "next/font/google";[m
[31m-import { SetStateAction, useState} from "react";[m
[32m+[m[32mimport { JetBrains_Mono } from "next/font/google";[m
[32m+[m[32mimport { SetStateAction, useState } from "react";[m
 import { profanity } from '@2toad/profanity';[m
 [m
 const jetbrains_400weight = JetBrains_Mono({[m
[36m@@ -14,6 +14,7 @@[m [mexport default function Page() {[m
     const [privacyOption, setPrivacyOption] = useState('');[m
     const [chatName, setChatName] = useState('');[m
     const [chatPassword, setChatPassword] = useState('');[m
[32m+[m[32m    const [chatDesc, setChatDesc] = useState('');[m
 [m
     let baseUrl: string;[m
     const useProdUrl = false[m
[36m@@ -31,10 +32,19 @@[m [mexport default function Page() {[m
             return[m
         }[m
 [m
[32m+[m[32m        if (!chatDesc) {[m
[32m+[m[32m            alert("Please enter a chat description");[m
[32m+[m[32m            return[m
[32m+[m[32m        }[m
[32m+[m
         if (profanity.exists(chatName)) {[m
             alert("Please enter a valid chat name that does not include any profanity");[m
             return;[m
         }[m
[32m+[m[32m        if (profanity.exists(chatDesc)) {[m
[32m+[m[32m            alert("Please enter a valid chat description that does not include any profanity");[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
 [m
         if (!chatPassword) {[m
             alert("Please enter a chat password");[m
[36m@@ -55,8 +65,9 @@[m [mexport default function Page() {[m
                 chatName: chatName,[m
                 privacyOption: privacyOption,[m
                 chatPassword: chatPassword,[m
[32m+[m[32m                chatDesc: chatDesc[m
             })[m
[31m-        }) .then(response => {[m
[32m+[m[32m        }).then(response => {[m
             if (response.ok) {[m
                 alert("Successfully created Convo");[m
             } else {[m
[36m@@ -73,7 +84,7 @@[m [mexport default function Page() {[m
     };[m
     return (<>[m
         <div className="flex flex-col h-full justify-center align-center p-5 content-center items-center">[m
[31m-            <div className={`flex flex-col  items-center backdrop-filter backdrop-blur-md h-[400px] border-white border-2 rounded-2xl w-[30%] p-5 ${jetbrains_400weight.className}`}>[m
[32m+[m[32m            <div className={`flex flex-col  items-center backdrop-filter backdrop-blur-md border-white border-2 rounded-2xl w-[30%] p-5 ${jetbrains_400weight.className}`}>[m
                 <p className={`text-lg font-bold ${jetbrains_400weight.className}`}>[m
                     Create A Convo[m
                 </p>[m
[36m@@ -82,22 +93,15 @@[m [mexport default function Page() {[m
                     <label htmlFor={"chatName"} className={`text-sm ${jetbrains_400weight.className}`}>[m
                         Convo Name:[m
                     </label>[m
[32m+[m[32m                    <br />[m
                     <input onChange={(e) => setChatName(e.target.value)}[m
[31m-                           className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}[m
[31m-                           placeholder={"General"} type={"text"}>[m
[32m+[m[32m                        className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none  text-black`}[m
[32m+[m[32m                        placeholder={"General"} type={"text"}>[m
                     </input>[m
[31m-                    <br/>[m
                     <br />[m
[31m-                    <label htmlFor={"chatPassword"} className={`text-sm ${jetbrains_400weight.className}`}>[m
[31m-                        Chat Password:[m
[31m-                    </label>[m
[31m-                    <input onChange={(e) => setChatPassword(e.target.value)}[m
[31m-                           className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}[m
[31m-                           placeholder={"Password0!"} type={"password"}>[m
[31m-                    </input>[m
[31m-                    <br/>[m
[31m-                    <br/>[m
[32m+[m[32m                    <br />[m
                     <label>[m
[32m+[m[32m                        <p className="">Privacy:</p>[m
                         <input[m
                             type="radio"[m
                             name="options"[m
[36m@@ -105,10 +109,9 @@[m [mexport default function Page() {[m
                             checked={privacyOption === 'private'}[m
                             onChange={handleChange}[m
                         />[m
[31m-[m
[31m-                        ​ Private[m
[32m+[m[32m                        <p className="inline ml-2">Private</p>[m
                     </label>[m
[31m-                    <br/>[m
[32m+[m[32m                    <br />[m
                     <label>[m
                         <input[m
                             type="radio"[m
[36m@@ -117,13 +120,39 @@[m [mexport default function Page() {[m
                             checked={privacyOption === 'public'}[m
                             onChange={handleChange}[m
                         />[m
[31m-                        ​ Public[m
[32m+[m[32m                        <p className="inline ml-2">Public</p>[m
[32m+[m[32m                    </label>[m
[32m+[m[32m                    {privacyOption == 'private' ? ([m
[32m+[m[32m                        <>[m
[32m+[m[32m                            <br />[m
[32m+[m[32m                            <br />[m
[32m+[m[32m                            <label htmlFor={"chatPassword"} className={`text-sm ${jetbrains_400weight.className}`}>[m
[32m+[m[32m                                Chat Password:[m
[32m+[m[32m                            </label>[m
[32m+[m[32m                            <br />[m
[32m+[m[32m                            <input onChange={(e) => setChatPassword(e.target.value)}[m
[32m+[m[32m                                className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}[m
[32m+[m[32m                                placeholder={"Password0!"} type={"password"}>[m
[32m+[m[32m                            </input>[m
[32m+[m[32m                        </>[m
[32m+[m[32m                    ) : <>[m
[32m+[m[32m                    </>[m
[32m+[m[32m                    }[m
[32m+[m[32m                    <br />[m
[32m+[m[32m                    <br />[m
[32m+[m[32m                    <label htmlFor={"chatDesc"} className={`text-sm ${jetbrains_400weight.className}`}>[m
[32m+[m[32m                        Chat Description:[m
                     </label>[m
[31m-                    <br/>[m
[31m-                    <br/>[m
[32m+[m[32m                    <br />[m
[32m+[m[32m                    <input onChange={(e) => setChatDesc(e.target.value)}[m
[32m+[m[32m                        className={`rounded-2xl p-[1px] pl-[5px] focus:outline-none text-black`}[m
[32m+[m[32m                        placeholder={`Welcome to ${chatName || "General"}`} type={"text"}>[m
[32m+[m[32m                    </input>[m
[32m+[m[32m                    <br />[m
[32m+[m[32m                    <br />[m
                     <input type="submit"[m
[31m-                           className={`border-white ml-2 hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 p-[2]`}[m
[31m-                           value="Create"/>[m
[32m+[m[32m                        className={`border-white ml-2 hover:text-blue-700 hover:bg-white rounded-2xl text-sm border-2 p-[2]`}[m
[32m+[m[32m                        value="Create" />[m
                 </form>[m
             </div>[m
         </div>[m
[1mdiff --git a/app/globals.css b/app/globals.css[m
[1mindex bda6c11..9b8efd6 100644[m
[1m--- a/app/globals.css[m
[1m+++ b/app/globals.css[m
[36m@@ -19,21 +19,32 @@[m [mbody {[m
 [m
 @keyframes bgGradient {[m
   0% {[m
[31m-    transform: translate(100%, -150%);[m
[32m+[m[32m    transform: translate(100%, -85%);[m
   }[m
   50% {[m
     transform: translate(100%, 0%);[m
   }[m
 [m
   100% {[m
[31m-    transform: translate(100%, 150%);[m
[32m+[m[32m    transform: translate(100%, 115%);[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m@media only screen and (max-width: 800px) {[m
[32m+[m[32m  .mainBackground {[m
[32m+[m[32m    top: -500;[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m@media only screen and (min-width: 800px) {[m
[32m+[m[32m  .mainBackground {[m
[32m+[m[32m    top: 0;[m
   }[m
 }[m
 [m
 .mainBackground{[m
   display: flex;[m
   position: fixed;[m
[31m-  top: 0;[m
   left: 0;[m
   z-index: -100;[m
   width: 200vw;[m
[36m@@ -193,7 +204,7 @@[m [mbody {[m
   z-index: -102;[m
   padding: 3px;[m
   margin: 5px;[m
[31m-  animation: bgGradient 3s linear infinite;[m
[32m+[m[32m  animation: bgGradient 1.85s linear infinite;[m
   transform: translate(200%, 200%);[m
   animation-delay: 250ms;[m
   background-size: 300%;[m
[1mdiff --git a/app/layout.tsx b/app/layout.tsx[m
[1mindex 5362d91..d55e66e 100644[m
[1m--- a/app/layout.tsx[m
[1m+++ b/app/layout.tsx[m
[36m@@ -62,6 +62,11 @@[m [mexport default function RootLayout({[m
             </div>[m
             <div className="bgCircle">[m
 [m
[32m+[m[32m            </div><div className="bgCircle">[m
[32m+[m
[32m+[m[32m            </div>[m
[32m+[m[32m            <div className="bgCircle">[m
[32m+[m
             </div>[m
           </div>[m
           <div id='bgLine-2' className="bg-line">[m
[1mdiff --git a/src/lib/types.ts b/src/lib/types.ts[m
[1mindex 85c641b..2cfbf8f 100644[m
[1m--- a/src/lib/types.ts[m
[1m+++ b/src/lib/types.ts[m
[36m@@ -7,6 +7,18 @@[m [mexport interface User {[m
     desc?: string;[m
 }  [m
 [m
[32m+[m[32mexport interface Chat {[m
[32m+[m[32m    _id: string;[m
[32m+[m[32m    chatName: string;[m
[32m+[m[32m    privacyOption: string;[m
[32m+[m[32m    chatPassword?: string;[m
[32m+[m[32m    chatDesc: string;[m
[32m+[m[32m    ownerUsername: string;[m
[32m+[m[32m    createdBy: string;[m
[32m+[m[32m    ownerId: string;[m
[32m+[m[32m    usersAdded: string;[m
[32m+[m[32m}[m
[32m+[m
 export interface Version {[m
     vername: string;[m
     changes: string;[m
[1mdiff --git a/ui/navbar.tsx b/ui/navbar.tsx[m
[1mindex 1f3a1dc..c43e878 100644[m
[1m--- a/ui/navbar.tsx[m
[1m+++ b/ui/navbar.tsx[m
[36m@@ -2,26 +2,26 @@[m
 [m
 import { HomeIcon, UsersIcon, ArchiveBoxIcon, CurrencyDollarIcon, Cog6ToothIcon, MapIcon } from '@heroicons/react/24/solid'[m
 import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'[m
[31m-import React from "react";[m
 import { JetBrains_Mono } from "next/font/google";[m
 import clsx from "clsx";[m
[32m+[m[32mimport Link from "next/link";[m
[32m+[m[32mimport Pfp from "./homepage/pfp";[m
 import { usePathname } from "next/navigation";[m
[32m+[m[32mimport NavbarChatsIcon from "@/ui/convoes-chats-icon"[m
 [m
 const jetbrains_800weight = JetBrains_Mono({[m
     weight: "800",[m
     subsets: ["latin"],[m
 });[m
 [m
[31m-import Link from "next/link";[m
[31m-import Pfp from "./homepage/pfp";[m
[31m-[m
 export default function Navbar() {[m
     const links = [[m
         { name: "Home", href: "/", icon: HomeIcon },[m
[32m+[m[32m        { name: "Chats", useDiv: true, href: "/allchats", icon: NavbarChatsIcon },[m
         { name: "Users", href: "/allusers", icon: UsersIcon },[m
         { name: "Changelog", href: "/changelog", icon: ArchiveBoxIcon },[m
         { name: "Donate", href: "https://pay.internetbowser.com", icon: CurrencyDollarIcon },[m
[31m-        { name: "Roadmap", href: "/roadmap", icon: MapIcon},[m
[32m+[m[32m        { name: "Roadmap", href: "/roadmap", icon: MapIcon },[m
         { name: "Settings", href: "/settings", icon: Cog6ToothIcon },[m
     ];[m
 [m
[36m@@ -46,31 +46,54 @@[m [mexport default function Navbar() {[m
                                         className="flex flex-row mx-3 h-full justify-center"[m
                                         key={link.name}[m
                                     >[m
[31m-                                        <Link[m
[31m-                                            key={link.name}[m
[31m-                                            href={link.href}[m
[31m-                                            className={clsx([m
[31m-                                                jetbrains_800weight.className +[m
[31m-                                                " " +[m
[31m-                                                "p-1 relative rounded-2xl",[m
[31m-                                                {[m
[31m-                                