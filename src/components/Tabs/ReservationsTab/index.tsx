import { format } from 'date-fns'
import { Trash, Pencil } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'

import { TooltipComponent } from '../../Tooltip'

import { ActionButton, ActionGroup, Flex } from '../../../styles/global'
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogButton,
} from '../../AlertDialog/styles'
import { InterestedContainer, InterestedList } from './styles'
import Cookies from 'js-cookie'
import { EditReservationModal } from '../../EditReservationModal'
import { toast } from 'react-toastify'
import { deleteReservation } from '../../../services/reservations/delete'

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

  async function handleDeletePackage(id: string) {
    const response = await deleteReservation(id)

    if (response.status === 204) {
      toast.success('Reserva foi excluída com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      const reservationsWithoutDeleteItem = reservation.filter(
        (i) => i.id !== id,
      )

      setReservation(reservationsWithoutDeleteItem)
    } else {
      toast.error(`Ops... Erro: ${response.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

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
      <h1>Lista das Reservas</h1>

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
                      <Dialog.Root>
                        <TooltipComponent label="editar">
                          <Dialog.Trigger asChild>
                            <ActionButton color="yellow">
                              <Pencil size={18} />
                            </ActionButton>
                          </Dialog.Trigger>
                        </TooltipComponent>

                        <EditReservationModal data={i} />
                      </Dialog.Root>

                      <AlertDialog.Root>
                        <TooltipComponent label="deletar">
                          <AlertDialog.Trigger asChild>
                            <ActionButton color="red">
                              <Trash size={18} />
                            </ActionButton>
                          </AlertDialog.Trigger>
                        </TooltipComponent>

                        <AlertDialog.Portal>
                          <AlertDialogOverlay />

                          <AlertDialogContent>
                            <AlertDialogTitle>
                              Você tem certeza absoluta, que deseja excluir?
                            </AlertDialogTitle>

                            <Flex css={{ justifyContent: 'flex-end' }}>
                              <AlertDialog.Cancel asChild>
                                <AlertDialogButton
                                  variant="mauve"
                                  css={{ marginRight: 25 }}
                                >
                                  Cancelar
                                </AlertDialogButton>
                              </AlertDialog.Cancel>

                              <AlertDialog.Action asChild>
                                <AlertDialogButton
                                  variant="red"
                                  onClick={() => handleDeletePackage(i.id)}
                                >
                                  Sim, deletar!
                                </AlertDialogButton>
                              </AlertDialog.Action>
                            </Flex>
                          </AlertDialogContent>
                        </AlertDialog.Portal>
                      </AlertDialog.Root>
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
