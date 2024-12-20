import goofySkull from '@/public/goofyskull-nobg.png'
import Image from 'next/image'

export default function PfpHiddenBg({ size = "1em" }) {
    return (
        <div
      className="rounded-full overflow-hidden flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={goofySkull} // Replace with your image path
        alt="Profile Picture"

        className="object-contain"
        width={1000} // Large default size for resolution
        height={1000}
      />
    </div>
    )
}