import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Input } from '../components/FormInput'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  async function loginSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
        credentials: "Include"
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }

      toast.success(data.message)

      if (data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/profile')
      }
      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main>
      <form onSubmit={loginSubmit}>
        <Input
          type='text'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          />
        <div>
          <Input 
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
          >{showPassword ? <FaRegEyeSlash/> : <FaRegEye/> }</button>
        </div>
        <button>Connexion</button>
        <Link to='/register'>Inscription</Link>
        <Link to='/forgot-password'>Mot de passe oublié</Link>
      </form>
      <ToastContainer/>
    </main>
  )
}
