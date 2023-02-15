/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import { Trash, Pencil, FileText } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'

import { TooltipComponent } from '../../Tooltip'

import { ActionButton, ActionGroup, Button } from '../../../styles/global'

import {
  AddNewReservationButton,
  InterestedContainer,
  InterestedList,
} from './styles'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import { deleteReservation } from '../../../services/reservations/delete'
import DeleteModal from '../../AlertDialog'

import { updateReservation } from '../../../services/reservations/update'

import { createReservation } from '../../../services/reservations/create'
import { NewReservationModal } from '../../NewReservationModal'
import { EditReservationModal } from '../../EditReservationModal'
import { reservationContract } from '../../../services/reservations/contract'

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
  const [openNewReservationModal, setOpenNewReservationModal] = useState(false)
  const [openEditReservationModal, setOpenEditReservationModal] =
    useState(false)
  const [reservation, setReservation] = useState<ReservationProps[]>([])

  async function handleCreatePackage(data: any, created: boolean) {

    const response = await createReservation(data)

    if (response.status === 201) {
      toast.success('Novo pacote foi adicionado com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      setReservation((state) => [data, ...state])
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

    setOpenNewReservationModal(false)
  }

  async function handleUpdateReservation(data: any, updated: boolean) {
    if (updated) {
      const response = await updateReservation(data)

      if (response.status === 200) {
        toast.success('Reserva foi atualizada com sucesso!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        setOpenEditReservationModal(false)
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

  async function handleDeleteReservation(id: string, deleted: boolean) {
    if (deleted) {
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
  }

  async function handleGenerateContract(id: string) {
    const response = await reservationContract(id)

    const contract = response.path

    window.open(contract)
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
  }, [openNewReservationModal, openEditReservationModal])

  return (
    <InterestedContainer>
      <h1>Lista das Reservas</h1>

      <Dialog.Root
        open={openNewReservationModal}
        onOpenChange={setOpenNewReservationModal}
      >
        <Dialog.Trigger asChild>
          <AddNewReservationButton>
            Adicionar Nova Reserva
          </AddNewReservationButton>
        </Dialog.Trigger>

        <NewReservationModal fn={handleCreatePackage} />
      </Dialog.Root>

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
                      <EditReservationModal
                        data={i}
                        fn={handleUpdateReservation}
                      />

                      <AlertDialog.Root>
                        <TooltipComponent label="deletar">
                          <AlertDialog.Trigger asChild>
                            <button className={ActionButton({ color: 'red' })}>
                              <Trash size={18} />
                            </button>
                          </AlertDialog.Trigger>
                        </TooltipComponent>

                        <DeleteModal id={i.id} fn={handleDeleteReservation} />
                      </AlertDialog.Root>

                      <TooltipComponent label="criar">
                        <button
                          className={ActionButton({ color: 'green' })}
                          onClick={() => handleGenerateContract(i.id)}
                        >
                          <FileText size={18} />
                        </button>
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
