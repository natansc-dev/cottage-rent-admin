import { LeftGrid, LoginContainer, RightGrid, TopContent } from './styled'
import logoImg from '../../../public/logo.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

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
    <LoginContainer>
      <LeftGrid>
        <h1>
          Torne suas ideias <br />
          em realidade
        </h1>
        <p>Chame seus amigos e parentes e venha curtir na chácara Kaíros</p>
      </LeftGrid>

      <RightGrid>
        <TopContent>
          <img src={logoImg} alt="" width={320} />
        </TopContent>

        <h1>Bem-vindo!</h1>

        <p>Por favor, preencha com seu acesso.</p>

        <form onSubmit={handleSubmit}>
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
        </form>
      </RightGrid>
    </LoginContainer>
  )
}
