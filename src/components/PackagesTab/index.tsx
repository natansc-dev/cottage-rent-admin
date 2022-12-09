import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { PackageCard, PackageContainer, PackageGrid } from './styles'
import Cookies from 'js-cookie'
import { format } from 'date-fns'

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

      <PackageGrid>
        {packages.map((i) => {
          return (
            <PackageCard key={i.id}>
              <h2>{i.title}</h2>

              <time dateTime={format(new Date(i.start_at), 'yyyy-MM-dd')}>
                {format(new Date(i.start_at), 'dd/MM/yyyy')}
              </time>

              <time dateTime={format(new Date(i.end_at), 'yyyy-MM-dd')}>
                {format(new Date(i.end_at), 'dd/MM/yyyy')}
              </time>
            </PackageCard>
          )
        })}
      </PackageGrid>
    </PackageContainer>
  )
}
