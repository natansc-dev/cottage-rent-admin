import { useEffect, useState } from 'react'
import { CalendarCheck, Trash } from 'phosphor-react'
import { format } from 'date-fns'

import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { ActionButton, ActionGroup } from '../../../styles/global'
import { InterestedContainer, InterestedList } from './styles'

import { TooltipComponent } from '../../Tooltip'
import { NewReservationModal } from '../../NewReservationModal'

import { toast } from 'react-toastify'

import { api } from '../../../services/api'
import { deleteInterest } from '../../../services/interests/delete'
import DeleteModal from '../../AlertDialog'
import { createReservation } from '../../../services/reservations/create'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

interface InterestedProps {
  id: string
  start_at: string
  end_at: string
  name: string
  phone: string
}

export function InterestsTap() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [interested, setInterested] = useState<InterestedProps[]>([])

  async function handleCreateReservation(data: any, created: boolean) {
    if (created) {
      const response = await createReservation(data)

      if (response.status === 201) {
        toast.success(
          'Reserva foi criada com sucesso! Vá para a aba de Reservas',
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        )

        setOpen(false)
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
  }

  async function handleDeleteInterest(id: string, deleted: boolean) {
    if (deleted) {
      const response = await deleteInterest(id)

      if (response.status === 204) {
        toast.success('Interessado(a) foi excluído(a) com sucesso!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        const interestedsWithoutDeleteItem = interested.filter(
          (i) => i.id !== id,
        )

        setInterested(interestedsWithoutDeleteItem)
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
  }

  async function getInterests() {
    try {
      const response = await api.get('/interests/all')

      setInterested(response.data)
    } catch (error) {
      Cookies.remove('reactauth.token', { path: '/' })
      Cookies.remove('reactauth.refresh_token', { path: '/' })

      navigate('/')
    }
  }

  useEffect(() => {
    getInterests()
  }, [open])

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
            {interested.map((i) => {
              return (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.phone}</td>
                  <td>{format(new Date(i.start_at), 'dd/MM/yyyy')}</td>
                  <td>{format(new Date(i.end_at), 'dd/MM/yyyy')}</td>
                  <td>
                    <ActionGroup>
                      <AlertDialog.Root>
                        <TooltipComponent label="deletar">
                          <AlertDialog.Trigger asChild>
                            <ActionButton color="red">
                              <Trash size={18} />
                            </ActionButton>
                          </AlertDialog.Trigger>
                        </TooltipComponent>

                        <DeleteModal id={i.id} fn={handleDeleteInterest} />
                      </AlertDialog.Root>

                      <Dialog.Root open={open} onOpenChange={setOpen}>
                        <TooltipComponent label="criar">
                          <Dialog.Trigger asChild>
                            <ActionButton color="green">
                              <CalendarCheck size={18} />
                            </ActionButton>
                          </Dialog.Trigger>
                        </TooltipComponent>

                        <NewReservationModal
                          data={i}
                          fn={handleCreateReservation}
                        />
                      </Dialog.Root>
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
