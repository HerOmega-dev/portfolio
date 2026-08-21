import React from 'react'
import Transition from '../components/Transition'
import Header from '../components/Header'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <Transition sectionA={<Header />} sectionB={<Projects />} />
  )
}
