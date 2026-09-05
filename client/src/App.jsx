import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PuzzleClipPath } from './components/PuzzleSVG'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import CV from './pages/CV'
import Contact from './pages/Contact'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'

function App() {

  return (
    <>
      {/* PuzzleClipPath sert à déclarer une définition SVG qui sera référencée par clipPath. Il ne sert pas à afficher une pièce mais à mettre les Link de la Navbar en forme de pièce. La couleur ou la taille n'importe pas, il n'y a que la géométrie qui compte */}
      <PuzzleClipPath /> 
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/verify-email' element={<VerifyEmail/>} />
          <Route path='/login' element={<Login/>} />
          {/* <Route path='/logout' element={<Logout/>} /> */}
          <Route path='/cv' element={<CV/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
