import React from 'react'

export default function StatCard({
  id,
  percentage,
  description,
  bgColor,
  textColor = 'text-[#111111]',
  style = {},
}) {
  return (
    <div
      id={id}
      className={`absolute z-30 flex flex-col justify-center items-center text-center rounded-2xl w-[290px] sm:w-[330px] md:w-[360px] min-h-[145px] md:min-h-[165px] px-8 py-6 md:px-9 md:py-7 shadow-xl select-none ${bgColor} ${textColor}`}
      style={{
        opacity: 0,
        ...style,
      }}
    >
      <span className="text-5xl sm:text-6xl md:text-[68px] font-bold leading-none mb-3 tracking-tight">
        {percentage}
      </span>
      <span className="text-sm sm:text-base md:text-[18px] font-medium leading-snug">
        {description}
      </span>
    </div>
  )
}
