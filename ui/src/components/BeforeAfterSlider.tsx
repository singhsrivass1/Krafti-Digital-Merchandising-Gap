import { useState } from "react"

type Props = {
  beforeImage: string
  afterImage: string
}

export default function BeforeAfterSwitch({
  beforeImage,
  afterImage
}: Props) {
  const [value, setValue] = useState(0)

  const isAfter = value >= 50

  return (
    <div className="w-full space-y-4">
      
      {/* IMAGE */}
      <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-sm bg-black">
        <img
          src={isAfter ? afterImage : beforeImage}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />

        {/* LABEL */}
        <span className="absolute top-3 left-3 text-xs bg-black/40 text-white px-2 py-1 rounded">
          {isAfter ? "After" : "Before"}
        </span>
      </div>

      {/* SLIDER */}
      <div className="px-2">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full accent-[#C07A54]"
        />

        <div className="flex justify-between text-xs text-[#8A6A54] mt-1">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>
    </div>
  )
}
