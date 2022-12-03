import { useContext } from 'react'
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

export function Dashboard() {
  const { user } = useContext(AuthContext)

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
                <tr>
                  <td>Natan Cardoso</td>
                  <td>(19) 9 8260-6755</td>
                  <td>10/12/2022</td>
                  <td>12/12/2022</td>
                  <td>
                    <button>
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Natan Cardoso</td>
                  <td>(19) 9 8260-6755</td>
                  <td>10/12/2022</td>
                  <td>12/12/2022</td>
                  <td>
                    <button>
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Natan Cardoso</td>
                  <td>(19) 9 8260-6755</td>
                  <td>10/12/2022</td>
                  <td>12/12/2022</td>
                  <td>
                    <button>
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Natan Cardoso</td>
                  <td>(19) 9 8260-6755</td>
                  <td>10/12/2022</td>
                  <td>12/12/2022</td>
                  <td>
                    <button>
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
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
