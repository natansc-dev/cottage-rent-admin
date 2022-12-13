import {
  BackgroundImage,
  LeftGrid,
  LoginContainer,
  LoginForm,
  RightGrid,
} from './styled'
import logoImg from '../../assets/images/logo.png'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type loginFormInputs = z.infer<typeof loginFormSchema>

export function Login() {
  const navigate = useNavigate()
  const { SignIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: loginFormInputs) {
    await SignIn(data)

    reset()
  }

  useEffect(() => {
    const token = Cookies.get('reactauth.token')
    const tokenRefresh = Cookies.get('reactauth.token')

    if (token && tokenRefresh) {
      navigate('/dashboard')
    }
  }, [])

  return (
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
  )
}
