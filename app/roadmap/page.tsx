import { Timeline } from "antd";
import { JetBrains_Mono } from "next/font/google";

const jetbrains_400weight = JetBrains_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function Page() {
    return (<>
        <div className={`h-full flex flex-col text-5xl items-center content-center font-bold ${jetbrains_400weight.className}`}>
            <div className="bg-blue-700 border-white rounded-2xl w-[20%] flex justify-center flex-col border-2 p-5">
                <h1>
                    Roadmap
                </h1>
                <br />
                <Timeline className="text-white"
                    items={[
                        {
                            color: 'green',
                            children: <p className="text-3xl">Create site</p>
                        },
                        {
                            color: 'green',
                            children: <p className="text-3xl" >Add user functionality</p>
                        },
                        {
                            color: 'yellow',
                            children: (
                                <>
                                    <p className="text-3xl">Add chat functionality (Jan 2025)</p>
                                </>
                            ),
                        },
                        {
                            color: 'white',
                            children: (
                                <>
                                    <p className="text-3xl" >Add badges </p>
                                </>
                            ),
                        },
                        {
                            color: 'white',
                            children: (
                                <>
                                    <p className="text-3xl">Add chat functionality</p>
                                </>
                            ),
                        },
                    ]}
                />    </div>
        </div>
    </>);
}