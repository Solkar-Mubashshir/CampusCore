import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campuscore_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password })
    
    const userData = { ...data.user, token: data.token }
    
    setUser(userData)
    localStorage.setItem('campuscore_user', JSON.stringify(userData))
    localStorage.setItem('campuscore_token', data.token)

    const role = data.user.role
    if (role === 'student') window.location.href = '/student/dashboard'
    else if (role === 'teacher') window.location.href = '/teacher/dashboard'
    else if (role === 'hrteacher') window.location.href = '/hr/dashboard'
    else if (role === 'hod') window.location.href = '/hod/dashboard'

    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('campuscore_user')
    localStorage.removeItem('campuscore_token')
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)