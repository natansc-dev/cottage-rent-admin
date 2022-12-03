import {
  BackgroundImage,
  LeftGrid,
  LoginContainer,
  LoginForm,
  RightGrid,
} from './styled'
import logoImg from '../../assets/images/logo.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type loginFormInputs = z.infer<typeof loginFormSchema>

export function Login() {
  const { user, signIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: loginFormInputs) {
    await signIn(data)

    reset()
  }

  return (
    <>
      {user && <Navigate to="/dashboard" replace={true} />}
      <BackgroundImage>
        <LoginContainer media={{ '@lg': 'lg' }}>
          <LeftGrid media={{ '@lg': 'lg' }}>
            <h1>
              Torne suas ideias <br />
              em realidade
            </h1>

            <p>Chame seus amigos e parentes e venha curtir na chácara Kaíros</p>
          </LeftGrid>

          <RightGrid media={{ '@lg': 'lg' }}>
            <img src={logoImg} alt="" />

            <h1>Bem-vindo!</h1>

            <p>Por favor, preencha com seu acesso.</p>

            <LoginForm
              onSubmit={handleSubmit(handleLogin)}
              media={{ '@md': 'md', '@lg': 'lg' }}
            >
              <input
                type="text"
                placeholder="Usuário"
                required
                {...register('username')}
              />

              <input
                type="password"
                placeholder="Senha"
                required
                {...register('password')}
              />

              <button type="submit" disabled={isSubmitting}>
                Log in
              </button>
            </LoginForm>
          </RightGrid>
        </LoginContainer>
      </BackgroundImage>
    </>
  )
}
