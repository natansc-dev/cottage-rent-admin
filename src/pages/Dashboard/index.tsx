import { useContext } from 'react'
import { InterestsTap } from '../../components/InterestsTab'
import { ReservationsTab } from '../../components/ReservationsTab'
import { AuthContext } from '../../context/AuthContext'
import { TabsContent, TabsList, TabsRoot, TabsTrigger, Text } from './styles'

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
        <InterestsTap />
      </TabsContent>

      <TabsContent value="tab2">
        <ReservationsTab />
      </TabsContent>

      <TabsContent value="tab3">
        <Text>Em breve</Text>
      </TabsContent>
    </TabsRoot>
  )
}
