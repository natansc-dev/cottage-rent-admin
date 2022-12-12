import { SignOut } from 'phosphor-react'
import { InterestsTap } from '../../components/Tabs/InterestsTab'
import { ReservationsTab } from '../../components/Tabs/ReservationsTab'
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
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { PackagesTab } from '../../components/Tabs/PackagesTab'
import { ToastContainer } from 'react-toastify'

export function Dashboard() {
  const navigate = useNavigate()

  function handleLogoff() {
    Cookies.remove('reactauth.token', { path: '/' })
    Cookies.remove('reactauth.refresh_token', { path: '/' })

    navigate('/')
  }

  return (
    <>
      <Header>
        <img src={logoImg} alt="" />

        <SignOutButton onClick={handleLogoff}>
          <SignOut size={18} />
        </SignOutButton>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Header>

      <TabsRoot defaultValue="tab1">
        <TabsList aria-label="Controle da Chacára">
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
          <PackagesTab />
        </TabsContent>
      </TabsRoot>
    </>
  )
}
