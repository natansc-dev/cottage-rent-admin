import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import {
  AddNewPackageButton,
  PackageCard,
  PackageContainer,
  PackageGrid,
} from './styles'
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import * as Dialog from '@radix-ui/react-dialog'
import { NewPackageModal } from '../NewPackageModal'

interface PackagesProps {
  id: string
  start_at: string
  end_at: string
  title: string
}

export function PackagesTab() {
  const navigate = useNavigate()

  const [packages, setPackages] = useState<PackagesProps[]>([])

  async function getPackages() {
    try {
      const response = await api.get('/packages')

      setPackages(response.data)
    } catch (error) {
      Cookies.remove('reactauth.token', { path: '/' })
      Cookies.remove('reactauth.refresh_token', { path: '/' })

      navigate('/')
    }
  }

  useEffect(() => {
    getPackages()
  }, [])

  return (
    <PackageContainer>
      <h1>Lista de Pacotes</h1>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <AddNewPackageButton>Adicionar Novo Pacote</AddNewPackageButton>
        </Dialog.Trigger>

        <NewPackageModal />
      </Dialog.Root>

      <PackageGrid>
        {packages.map((i) => {
          return (
            <PackageCard key={i.id}>
              <h2>{i.title}</h2>
              <p>
                <time dateTime={format(new Date(i.start_at), 'yyyy-MM-dd')}>
                  {format(new Date(i.start_at), 'dd/MM/yyyy')}
                </time>
                &nbsp; até &nbsp;
                <time dateTime={format(new Date(i.end_at), 'yyyy-MM-dd')}>
                  {format(new Date(i.end_at), 'dd/MM/yyyy')}
                </time>
              </p>
            </PackageCard>
          )
        })}
      </PackageGrid>
    </PackageContainer>
  )
}
