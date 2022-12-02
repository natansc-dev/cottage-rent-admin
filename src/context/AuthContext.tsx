/* eslint-disable camelcase */
import { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'
import { useCookies } from 'react-cookie'

type User = {
  email: string
  name: string
}

type SignInCredentials = {
  username: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [cookies, setCookie] = useCookies([
    '@reactauth.token',
    '@reactauth.refresh_token',
  ])

  const [user, setUser] = useState<User>({
    email: '',
    name: '',
  })
  const isAuthenticated = !!user.email

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        username,
        password,
      })

      const { token, refresh_token } = response.data

      setCookie('@reactauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie('@reactauth.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        name: response.data.user.name,
        email: response.data.user.name,
      })

      window.location.href = '/dashboard'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
