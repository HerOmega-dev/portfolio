import React from 'react'
import { useRef, useEffect } from 'react'
import Puzzle from './Puzzle'

export default function Header() {
    //---Padding calculé---
    const titre1Ref = useRef(null)
    const titre2Ref = useRef(null)

    useEffect(() => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.font = getComputedStyle(titre1Ref.current).font
        const largeur = ctx.measureText('<').width
        titre2Ref.current.style.paddingLeft = largeur + 'px'
    }, [])

  return (
    <>
        <header className='grid grid-cols-[1fr_auto] '>
            <div id="part-1">
                <Puzzle/>
            </div>

            <div id="part-2">
                <h1 ref={titre1Ref}>&lt;RENIER Héloïse /&gt;</h1>
                <h2 ref={titre2Ref}>{"{Développeuse web}"}</h2>
            </div>

            <div id="part-3">
                <h2>{"[HTML/CSS, JavaScript, React, Node.js, Figma]"}</h2>
                <h2>{"//et plus à venir"}</h2>
            </div>
        </header>
    </>
  )
}
