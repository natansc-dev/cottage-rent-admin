import { useContext } from 'react'
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
        <Text>Make changes to your account here. Click save when done.</Text>
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
