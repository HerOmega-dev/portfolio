import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/FormInput'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  async function register(e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('userName', userName)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('profilePicture', profilePicture)
      formData.append('role', role)

      const response = await fetch (`${import.meta.env.VITE_BACK_URL}/register`, {
        method: 'POST',
        body: formData,
        credentials: "include"
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }
      console.log(data.message)
      // navigate('/login')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className='h-screen'>
      <form onSubmit={register}>
        <div className='grid sd:grid-cols-1 grid-cols-2 gap-4 m-2'>
          <Input type="text" placeholder='Nom' onChange={(e) => setFirstName(e.target.value)} required/>
          <Input type="text" placeholder='Prénom' onChange={(e) => setLastName(e.target.value)} required/>
          <Input type="text" placeholder='Pseudo' onChange={(e) => setUserName(e.target.value)}/>
          <Input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
          <Input type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} required className={'col-span-2'}/>
          <Input type="file" name="profilePicture" accept='image/*' onChange={(e) => setProfilePicture(e.target.files[0])}/>
          <select name="role" id="role" onChange={(e) => setRole(e.target.value)} required>
            <option defaultValue={"choisir un rôle"}>Choisir un rôle</option>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <button>S'inscrire</button>
          <Link to='/forgotten-password'>Mot de passe oublié</Link>
          <Link to='/login'>Se connecter</Link>
        </div>
      </form>
    </main>
  )
}
