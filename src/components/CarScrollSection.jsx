import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Car from './Car'
import StatCard from './StatCard'

gsap.registerPlugin(ScrollTrigger)

export default function CarScrollSection() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const letterRefs = useRef([])

  const titleWords = ['WELCOME', 'ITZFIZZ']

  useEffect(() => {
    const ctx = gsap.context(() => {
      const carEl = carRef.current
      const trailEl = trailRef.current
      const roadEl = roadRef.current
      const letterEls = letterRefs.current.filter(Boolean)

      if (!carEl || !trailEl || !roadEl) return

      // Full reset function for initial / top state
      const resetToStart = () => {
        if (trailEl) trailEl.style.width = '0px'
        letterEls.forEach((letter) => {
          if (letter) {
            letter.style.opacity = '0'
            letter.style.visibility = 'hidden'
          }
        })
        gsap.set(['#box1', '#box2', '#box3', '#box4'], { opacity: 0 })
      }

      resetToStart()

      const roadWidth = roadEl.offsetWidth
      const carWidth = carEl.offsetWidth
      // Car drives across until its rear sits at right edge (matching screenshot)
      const endX = roadWidth - carWidth * 0.35

      // 1. Car & Road Trail Scroll Animation
      gsap.to(carEl, {
        x: endX,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          pin: trackRef.current,
          anticipatePin: 1,
          onLeaveBack: () => resetToStart(),
          onUpdate: (self) => {
            const currentX = gsap.getProperty(carEl, 'x')
            const totalWidth = roadEl.offsetWidth
            const roadRect = roadEl.getBoundingClientRect()

            // 100% black road when at top
            if (self.progress <= 0.01) {
              resetToStart()
              return
            }

            // Green trail width follows car
            let trailWidth = 0
            if (self.progress >= 0.98) {
              trailWidth = totalWidth
            } else {
              trailWidth = Math.max(0, Math.min(totalWidth, currentX + carWidth * 0.5))
            }
            trailEl.style.width = `${trailWidth}px`

            // Reveal letters as green trail moves over them; hide immediately on reverse
            letterEls.forEach((letter) => {
              if (!letter) return
              const letterRect = letter.getBoundingClientRect()
              const letterCenterPos = letterRect.left - roadRect.left + letterRect.width * 0.5

              if (trailWidth >= letterCenterPos) {
                letter.style.opacity = '1'
                letter.style.visibility = 'visible'
              } else {
                letter.style.opacity = '0'
                letter.style.visibility = 'hidden'
              }
            })
          },
        },
      })

      // 2. Stat Boxes Animations
      gsap.to('#box1', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=15% top',
          end: 'top+=30% top',
          scrub: true,
        },
        opacity: 1,
      })

      gsap.to('#box2', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=30% top',
          end: 'top+=45% top',
          scrub: true,
        },
        opacity: 1,
      })

      gsap.to('#box3', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=45% top',
          end: 'top+=60% top',
          scrub: true,
        },
        opacity: 1,
      })

      gsap.to('#box4', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=60% top',
          end: 'top+=75% top',
          scrub: true,
        },
        opacity: 1,
      })
    }, containerRef)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[380vh] bg-[#121212]">
      {/* Sticky Fullscreen Track Area */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d5db] overflow-hidden"
      >
        {/* Box 1 (Top Left - 58%) */}
        <StatCard
          id="box1"
          percentage="58%"
          description="Increase in pick up point use"
          bgColor="bg-[#def54f]"
          textColor="text-[#111111]"
          style={{ top: '4%', right: '32%' }}
        />

        {/* Box 3 (Top Right - 27%) */}
        <StatCard
          id="box3"
          percentage="27%"
          description="Increase in pick up point use"
          bgColor="bg-[#333333]"
          textColor="text-white"
          style={{ top: '4%', right: '6%' }}
        />

        {/* Box 2 (Bottom Left - 23%) */}
        <StatCard
          id="box2"
          percentage="23%"
          description="Decreased in customer phone calls"
          bgColor="bg-[#6ac9ff]"
          textColor="text-[#111111]"
          style={{ bottom: '4%', right: '35%' }}
        />

        {/* Box 4 (Bottom Right - 40%) */}
        <StatCard
          id="box4"
          percentage="40%"
          description="Decreased in customer phone calls"
          bgColor="bg-[#fa7328]"
          textColor="text-[#111111]"
          style={{ bottom: '4%', right: '8%' }}
        />

        {/* Deep Black Road Container */}
        <div
          ref={roadRef}
          className="relative w-full h-[230px] md:h-[280px] bg-[#1e1e1e] flex items-center overflow-hidden shadow-2xl"
        >
          {/* Neon Green Road Trail - Expands as car drives */}
          <div
            ref={trailRef}
            className="absolute left-0 top-0 h-full bg-[#45db7d] z-[5] w-0 pointer-events-none transition-none"
          />

          {/* Road Title positioned starting from the left side (matching screenshot) */}
          <div className="absolute left-[4%] md:left-[5%] top-1/2 -translate-y-1/2 z-10 flex items-center pointer-events-none select-none">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-10 text-[#111111] font-black text-4xl sm:text-6xl md:text-7xl lg:text-[7.2rem] tracking-wider leading-none">
              {titleWords.map((word, wordIdx) => (
                <div key={wordIdx} className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  {word.split('').map((char, charIdx) => {
                    const globalIdx = wordIdx === 0 ? charIdx : 7 + charIdx
                    return (
                      <span
                        key={charIdx}
                        ref={(el) => (letterRefs.current[globalIdx] = el)}
                        style={{ opacity: 0, visibility: 'hidden' }}
                        className="inline-block select-none transition-none"
                      >
                        {char}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* McLaren Sports Car */}
          <div
            ref={carRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 will-change-transform pointer-events-none select-none"
          >
            <Car />
          </div>
        </div>
      </div>
    </div>
  )
}
