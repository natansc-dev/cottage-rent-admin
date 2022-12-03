/* eslint-disable camelcase */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'
import Cookies from 'js-cookie'

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
  user: User | undefined
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const token = Cookies.get('reactauth.token')

    if (token) {
      api.get('/me').then((response) => {
        console.log(response)
      })
    }
  }, [])

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        username,
        password,
      })

      const {
        token,
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
