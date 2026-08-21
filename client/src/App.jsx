import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PuzzleSVG from './components/PuzzleSVG'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import CV from './pages/CV'
import Contact from './pages/Contact'
import Register from './pages/Register'

function App() {

  return (
    <>
      <PuzzleSVG />
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cv' element={<CV/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
