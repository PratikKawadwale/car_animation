import React from 'react'
import carImg from '../assets/car.png'

export default function Car({ className = '' }) {
  return (
    <div className={`relative flex items-center select-none pointer-events-none ${className}`}>
      <img
        src={carImg}
        alt="McLaren Car"
        className="h-[210px] md:h-[260px] w-auto max-w-none object-contain drop-shadow-[0_15px_22px_rgba(0,0,0,0.7)]"
        draggable={false}
      />
    </div>
  )
}
