import { format } from 'date-fns'
import { Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { ActionButton, InterestedContainer, InterestedList } from './styles'

interface InterestedProps {
  id: string
  start_at: string
  end_at: string
  name: string
  phone: string
}

export function InterestsTap() {
  const [interested, setInterested] = useState<InterestedProps[]>([])

  async function getInterests() {
    try {
      const response = await api.get('/interests/all')

      setInterested(response.data)
    } catch (error) {
      alert('Falha!')
    }
  }

  useEffect(() => {
    getInterests()
  }, [])

  return (
    <InterestedContainer>
      <h1>Lista de Interessados(a)</h1>

      <InterestedList>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Data inicial</th>
              <th>Data final</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {interested.map((i) => {
              return (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.phone}</td>
                  <td>{format(new Date(i.start_at), 'dd/MM/yyyy')}</td>
                  <td>{format(new Date(i.end_at), 'dd/MM/yyyy')}</td>
                  <td>
                    <ActionButton color="red">
                      <Trash size={24} />
                    </ActionButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </InterestedList>
    </InterestedContainer>
  )
}
