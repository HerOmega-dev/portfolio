import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation();
  const projectsLink = location.pathname === "/" ? "#sectionB" : "/#sectionB";

  return (
    <nav className='flex justify-end mr-10'>
      <Link to='/' className='flex w-30 h-30 bg-[#8B29FC] [clip-path:url(#puzzle-svg)] justify-center items-center -translate-y-14'>
        <span className='font-bold translate-x-1 translate-y-3'>Home</span>
      </Link>
      <Link to={projectsLink} className='flex w-30 h-30 bg-[#8B29FC] [clip-path:url(#puzzle-svg)] justify-center items-center -translate-y-14'>
        <span className='font-bold translate-x-1 translate-y-3'>Projects</span>
      </Link>
      <Link to='/cv' className='flex w-30 h-30 bg-[#8B29FC] [clip-path:url(#puzzle-svg)] justify-center items-center -translate-y-14'>
        <span className='font-bold translate-x-1 translate-y-3'>CV</span>
      </Link>
      <Link to='/contact' className='flex w-30 h-30 bg-[#8B29FC] [clip-path:url(#puzzle-svg)] justify-center items-center -translate-y-14'>
        <span className='font-bold translate-x-1 translate-y-3'>Contact</span>
      </Link>
      <Link to='/register' className='flex w-30 h-30 bg-[#8B29FC] [clip-path:url(#puzzle-svg)] justify-center items-center -translate-y-14'>
        <span className='font-bold translate-x-1 translate-y-3'>Register</span>
      </Link>
    </nav>
  )
}
