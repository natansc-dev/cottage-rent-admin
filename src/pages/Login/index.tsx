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

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { user, signIn } = useContext(AuthContext)

  async function handleSubmit() {
    event?.preventDefault()

    const data = {
      username,
      password,
    }

    await signIn(data)

    setUsername('')
    setPassword('')
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
              onSubmit={handleSubmit}
              media={{ '@md': 'md', '@lg': 'lg' }}
            >
              <input
                type="text"
                placeholder="Usuário"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Log in</button>
            </LoginForm>
          </RightGrid>
        </LoginContainer>
      </BackgroundImage>
    </>
  )
}
