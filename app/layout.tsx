import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "@/ui/navbar";
import { dark } from '@clerk/themes'


export const metadata: Metadata = {
  title: "Convoes 2",
  description: "The next-generation chatting service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-blue-700 antialiased`}
      >
        <ClerkProvider appearance={{
          baseTheme: dark,
          elements: {
            signIn: 'bg-slate-500 text-white',
          },
          variables: {

          },
        }}>
          <Navbar />
          <br />
          <br />
          <main>
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
        </ClerkProvider>
        <div className="mainBackground">
          <div id='bgLine-1' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-2' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-3' className="bg-line">
            <div className="bgCircle">
              
            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-4' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-5' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-6' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-7' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-8' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-9' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-10' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-11' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-12' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-13' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-14' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-15' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-16' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>
          <div id='bgLine-17' className="bg-line">
            <div className="bgCircle">

            </div>
            <div className="bgCircle">

            </div>
          </div>

        </div>
      </body>
    </html>
  );
}
