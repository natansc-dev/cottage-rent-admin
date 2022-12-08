import { format } from 'date-fns'
import { Trash, Pencil } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import AlertDialogDemo from '../AlertDialog'
import { TooltipComponent } from '../Tooltip'
import { ActionGroup, InterestedContainer, InterestedList } from './styles'
import Cookies from 'js-cookie'

interface ReservationProps {
  id: string
  start_at: string
  end_at: string
  name: string
  phone: string
  address: string
  cep: string
  city: string
  cpf: string
  district: string
  email: string
  rg: string
}

export function ReservationsTab() {
  const navigate = useNavigate()

  const [reservation, setReservation] = useState<ReservationProps[]>([])

  async function getReservations() {
    try {
      const response = await api.get('/reservations')

      setReservation(response.data)
    } catch (error) {
      Cookies.remove('reactauth.token', { path: '/' })
      Cookies.remove('reactauth.refresh_token', { path: '/' })

      navigate('/')
    }
  }

  useEffect(() => {
    getReservations()
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
            {reservation.map((i) => {
              return (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.phone}</td>
                  <td>{format(new Date(i.start_at), 'dd/MM/yyyy')}</td>
                  <td>{format(new Date(i.end_at), 'dd/MM/yyyy')}</td>
                  <td>
                    <ActionGroup>
                      <TooltipComponent label="editar">
                        <Pencil size={24} />
                      </TooltipComponent>

                      <TooltipComponent label="deletar">
                        <AlertDialogDemo id={i.id} remove={'reservation'}>
                          <Trash size={24} />
                        </AlertDialogDemo>
                      </TooltipComponent>
                    </ActionGroup>
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
