import yosh from '@/public/yosh.png'
import GdDrip from '@/public/gd-drip.png'
import ib from '@/public/ib.png'
import skullPfp from '@/public/goofyskull.png'
import Image from "next/image"
import "@/app/globals.css";

export default function PfpCarousel() {
    return (
        <>

            <div className="border-solid border-2 border-red-600 grid-rows-2 rounded-3xl p-5">
                    
                        <Image src={yosh} alt={`yoshi pfp`} className='makeImageCircular rounded-full overflow-hidden maxWidth200'/>

                    
                        <Image src={GdDrip} alt={`gd pfp`} className='makeImageCircular rounded-full overflow-hidden maxWidth200'/>
                    
                    
                        <Image src={ib} alt={`bowser pfp`} className='makeImageCircular rounded-full overflow-hidden maxWidth200'/>
                   
                    
                        <Image src={skullPfp} alt={`skull pfp`} className='makeImageCircular rounded-full overflow-hidden maxWidth200'/>
                    
            </div>
        </>
        
    );
}