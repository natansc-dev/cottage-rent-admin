import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'

import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {
  AddNewPackageButton,
  PackageCard,
  PackageContainer,
  PackageGrid,
} from './styles'

import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogButton,
} from '../../AlertDialog/styles'

import Cookies from 'js-cookie'
import { format } from 'date-fns'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPackage } from '../../../services/packages/create'
import { Pencil, Trash } from 'phosphor-react'
import { toast } from 'react-toastify'
import { ActionButton, ActionGroup, Flex } from '../../../styles/global'
import { TooltipComponent } from '../../Tooltip'
import { deletePackage } from '../../../services/packages/delete'
import { NewPackageModal } from '../../NewPackageModal'
import { EditPackageModal } from '../../EditPackageModal'
import { updatePackage } from '../../../services/packages/update'

interface PackagesProps {
  id: string
  start_at: string
  end_at: string
  title: string
}

const formSchema = z.object({
  start_at: z.date(),
  end_at: z.date(),
  title: z.string(),
})

type FormInputs = z.infer<typeof formSchema>

export function PackagesTab() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(false)
  const [packages, setPackages] = useState<PackagesProps[]>([])

  async function handleCreatePackage(data: any) {
    const response = await createPackage(data)

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

      setPackages((state) => [data, ...state])
      setRefresh(!refresh)
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

    setOpen(!open)
  }

  async function handleUpdatePackage(data: any, updated: boolean) {
    if (updated) {
      const response = await updatePackage(data)

      if (response.status === 200) {
        toast.success('Pacote foi atualizado com sucesso!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
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

      setRefresh(!updated)
    }
  }

  async function handleDeletePackage(id: string) {
    const response = await deletePackage(id)

    if (response.status === 204) {
      toast.success('Pacote foi excluído com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      const packagesWithoutDeleteItem = packages.filter((i) => i.id !== id)

      setPackages(packagesWithoutDeleteItem)
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
  }, [refresh])

  return (
    <PackageContainer>
      <h1>Lista de Pacotes</h1>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <AddNewPackageButton>Adicionar Novo Pacote</AddNewPackageButton>
        </Dialog.Trigger>

        <NewPackageModal fn={handleCreatePackage} />
      </Dialog.Root>

      <PackageGrid media={{ '@lg': 'lg' }}>
        {packages.map((i) => {
          return (
            <PackageCard key={i.id} media={{ '@lg': 'lg' }}>
              <header>
                <h2>{i.title}</h2>

                <ActionGroup>
                  <EditPackageModal data={i} fn={handleUpdatePackage} />

                  <AlertDialog.Root>
                    <TooltipComponent label="deletar">
                      <AlertDialog.Trigger asChild>
                        <button className={ActionButton({ color: 'red' })}>
                          <Trash size={18} />
                        </button>
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
                              variant="gray"
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
              </header>

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
