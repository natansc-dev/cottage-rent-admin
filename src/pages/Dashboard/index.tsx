import { SignOut } from 'phosphor-react'
import { InterestsTap } from '../../components/Tabs/InterestsTab'
import { ReservationsTab } from '../../components/Tabs/ReservationsTab'
import logoImg from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { PackagesTab } from '../../components/Tabs/PackagesTab'
import { ToastContainer } from 'react-toastify'
import {
  Header,
  SignOutButton,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from './styles'
import { useEffect } from 'react'

export function Dashboard() {
  const navigate = useNavigate()

  function handleLogoff() {
    Cookies.remove('reactauth.token', { path: '/' })
    Cookies.remove('reactauth.refresh_token', { path: '/' })

    navigate('/')
  }

  useEffect(() => {
    const token = Cookies.get('reactauth.token')
    if (!token) {
      navigate('/')
    } else {
      console.log('Bem-vindo ao painel administrativo da Chácara Kairós')
    }
  }, [])

  return (
    <>
      <Header media={{ '@lg': 'lg' }}>
        <img src={logoImg} alt="" />

        <SignOutButton media={{ '@lg': 'lg' }} onClick={handleLogoff}>
          <SignOut />
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
          <TabsTrigger value="tab1" media={{ '@lg': 'lg' }}>
            Interessados(a)
          </TabsTrigger>

          <TabsTrigger value="tab2" media={{ '@lg': 'lg' }}>
            Reservas
          </TabsTrigger>

          <TabsTrigger value="tab3" media={{ '@lg': 'lg' }}>
            Pacotes
          </TabsTrigger>
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
