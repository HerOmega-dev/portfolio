import { useEffect, useRef, useState } from 'react'
import Canvas from './Canvas'

export default function Transition({sectionA, sectionB}) {
    const wrapperRef = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(()=>{
        function handleScroll() {
            const wrapper = wrapperRef.current
            if(!wrapper) return

            const {top, height} = wrapper.getBoundingClientRect()
            const scrollable = height - window.innerHeight
            const scrolled = -top
            const p = Math.max(0, Math.min(1, scrolled / scrollable))

            setProgress(p)
        }

        window.addEventListener('scroll', handleScroll, {passive:true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

  return (
    <>
        {/* Le wrapper */}
        <div ref={wrapperRef} className='h-[300vh] relative'>
            {/* Zone sticky qui reste collée pendant le scroll */}
            <div className='sticky h-screen top-0 overflow-hidden'>
                {/* si sticky n'a pas sa position alors il n'est pas sticky */}
                {/* Section B - derrière, légère parallax */}
                <div id='sectionB' className='absolute z-0 inset-0 opacity-(--opacity) translate-y-(--ty) transition-transform duration-50 linear' style={{'--opacity': Math.max(0, (progress - 0.45) / 0.55), '--ty': `${(1 - progress) * 5}%`}}>{sectionB}</div>
                {/* Section A - davant, disparaît quand les pièces la recouvrent */}
                <div id='sectionA' className='flex flex-col justify-center items-center absolute z-1 inset-0 opacity-(--opacity)' style={{'--opacity': Math.max(0, 1 - Math.min(1, progress / 0.55) * 1.8)}}>{sectionA}</div>
                {/* Canvas des pièces de puzzle - par-dessus tout */}
                <Canvas progress={progress} />
            </div>
        </div>
    </>
  )
}
