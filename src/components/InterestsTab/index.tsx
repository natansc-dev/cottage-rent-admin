import { format } from 'date-fns'
import { CalendarCheck, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import AlertDialogDemo from '../AlertDialog'
import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { TooltipComponent } from '../Tooltip'
import { InterestedContainer, InterestedList } from './styles'
import { NewReservationModal } from '../NewReservationModal'
import { ActionButton, ActionGroup } from '../../styles/global'

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
                        <AlertDialogDemo remove="interest" id={i.id} />
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
