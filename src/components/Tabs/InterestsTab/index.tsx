import { useEffect, useState } from 'react'
import { CalendarCheck, Trash } from 'phosphor-react'
import { format } from 'date-fns'

import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogButton,
} from '../../AlertDialog/styles'
import { ActionButton, ActionGroup, Flex } from '../../../styles/global'
import { InterestedContainer, InterestedList } from './styles'

import { TooltipComponent } from '../../Tooltip'
import { NewReservationModal } from '../../NewReservationModal'

import { toast } from 'react-toastify'

import { api } from '../../../services/api'
import { deleteInterest } from '../../../services/interests/delete'

interface InterestedProps {
  id: string
  start_at: string
  end_at: string
  name: string
  phone: string
}

export function InterestsTap() {
  const [interested, setInterested] = useState<InterestedProps[]>([])

  async function getInterests() {
    try {
      const response = await api.get('/interests/all')

      setInterested(response.data)
    } catch (error) {
      alert('Falha!')
    }
  }

  useEffect(() => {
    getInterests()
  }, [])

  async function handleDeletePackage(id: string) {
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

      const interestedsWithoutDeleteItem = interested.filter((i) => i.id !== id)

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

                      <Dialog.Root>
                        <TooltipComponent label="criar">
                          <Dialog.Trigger asChild>
                            <ActionButton color="green">
                              <CalendarCheck size={18} />
                            </ActionButton>
                          </Dialog.Trigger>
                        </TooltipComponent>

                        <NewReservationModal data={i} />
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
