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

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPackage } from '../../services/packages/create'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Fieldset,
  Flex,
  IconButton,
  Input,
  Label,
} from '../NewPackageModal/styles'
import { X } from 'phosphor-react'
import { ToastContainer, toast } from 'react-toastify'

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
  const [open, setOpen] = useState(false)
  const [packages, setPackages] = useState<PackagesProps[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  async function handleCreatePackage(data: any) {
    const response = await createPackage(data)

    console.log(response)
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

      setPackages([...packages, data])
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
    reset()
    setOpen(!open)
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
  }, [])

  return (
    <PackageContainer>
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
      <h1>Lista de Pacotes</h1>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <AddNewPackageButton>Adicionar Novo Pacote</AddNewPackageButton>
        </Dialog.Trigger>

        <Dialog.Portal>
          <DialogOverlay />

          <DialogContent>
            <DialogTitle>Adiciona Pacote</DialogTitle>

            <DialogDescription>
              Make changes to your profile here. Click save when yore done.
            </DialogDescription>

            <form onSubmit={handleSubmit(handleCreatePackage)}>
              <Fieldset>
                <Label htmlFor="title">Título</Label>
                <Input type="text" required id="title" {...register('title')} />
              </Fieldset>

              <Flex css={{ justifyContent: 'space-between' }}>
                <Fieldset>
                  <Label htmlFor="start_at">Data Inicial</Label>
                  <Input
                    type="date"
                    required
                    id="start_at"
                    {...register('start_at', { valueAsDate: true })}
                  />
                </Fieldset>

                <Fieldset>
                  <Label htmlFor="end_at">Data Final</Label>
                  <Input
                    type="date"
                    required
                    id="end_at"
                    {...register('end_at', { valueAsDate: true })}
                  />
                </Fieldset>
              </Flex>

              <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="green">
                  Criar
                </Button>
              </Flex>
            </form>

            <Dialog.Close asChild>
              <IconButton aria-label="Close">
                <X size={18} />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
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
