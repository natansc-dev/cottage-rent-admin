import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {
  InterestedContainer,
  InterestedList,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
} from './styles'
import { Trash } from 'phosphor-react'
import { api } from '../../services/api'
import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'

interface InterestedProps {
  id: string
  start_at: string
  end_at: string
  name: string
  phone: string
}

export function Dashboard() {
  const { user } = useContext(AuthContext)
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
    <TabsRoot defaultValue="tab1">
      <TabsList aria-label="Manage your account">
        <TabsTrigger value="tab1">Interessados(a)</TabsTrigger>

        <TabsTrigger value="tab2">Reservas</TabsTrigger>

        <TabsTrigger value="tab3">Pacotes</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
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
                        <button>
                          <Trash size={24} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </InterestedList>
        </InterestedContainer>
      </TabsContent>

      <TabsContent value="tab2">
        <Text>Change your password here. After saving, l be logged out.</Text>
      </TabsContent>

      <TabsContent value="tab3">
        <Text>Change your password here. After saving, l be logged out.</Text>
      </TabsContent>
    </TabsRoot>
  )
}
