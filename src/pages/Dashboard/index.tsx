import { SignOut } from 'phosphor-react'
import { InterestsTap } from '../../components/InterestsTab'
import { ReservationsTab } from '../../components/ReservationsTab'
import {
  Header,
  SignOutButton,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
} from './styles'
import logoImg from '../../assets/images/logo.png'

export function Dashboard() {
  return (
    <>
      <Header>
        <img src={logoImg} alt="" />

        <SignOutButton onClick={() => console.log('teste')}>
          <SignOut size={24} />
        </SignOutButton>
      </Header>

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
    </>
  )
}
