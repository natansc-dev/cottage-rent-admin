import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

type User = {
  email: string
  name: string
}

type SignInCredentials = {
  username: string
  password: string
}

type AuthContextData = {
  SignIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User | undefined
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('reactauth.token')

    if (token) {
      api
        .get('/users/me')
        .then((response) => {
          const { email, name } = response.data

          setUser({ email, name })
        })
        .catch(() => {
          Cookies.remove('reactauth.token', { path: '/' })
          Cookies.remove('reactauth.refresh_token', { path: '/' })

          navigate('/')
        })
    }
  }, [])

  async function SignIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        username,
        password,
      })

      const {
        token,
        // eslint-disable-next-line camelcase
        refresh_token,
        user: { name, email },
      } = response.data

      Cookies.set('reactauth.token', token, {
        expires: 1, // 1 day
        path: '/',
      })

      Cookies.set('reactauth.refresh_token', refresh_token, {
        expires: 1, // 1 day
        path: '/',
      })

      setUser({
        email,
        name,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ SignIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
