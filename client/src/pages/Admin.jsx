import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    const navigate = useNavigate()
    const BACK_URL = import.meta.env.VITE_BACK_URL
    console.log(BACK_URL)
    async function getAdminData() {
        try {
            const response = await fetch(`${BACK_URL}/admin`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
            console.log(data.message)
        } catch (err) {
            console.error(err)
            navigate('/login')
        }
    }

    useEffect(() => {
        getAdminData()
    }, [])
  return (
    <div>Admin</div>
  )
}
