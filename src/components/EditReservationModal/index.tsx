import * as Dialog from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { Pencil, X } from 'phosphor-react'
import {
  ActionButton,
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
} from '../../styles/global'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { TooltipComponent } from '../Tooltip'

const formSchema = z.object({
  id: z.string(),
  start_at: z.string(),
  end_at: z.string(),
  name: z.string(),
  cpf: z.string(),
  rg: z.string(),
  phone: z.string(),
  email: z.string(),
  cep: z.string(),
  address: z.string(),
  district: z.string(),
  city: z.string(),
})

type FormInputs = z.infer<typeof formSchema>

interface EditReservationModalProps {
  data: {
    id: string
    start_at: string
    end_at: string
    name: string
    cpf: string
    rg: string
    phone: string
    email: string
    cep: string
    address: string
    district: string
    city: string
  }
  fn: (data: any, updated: boolean) => void
}

export function EditReservationModal({ data, fn }: EditReservationModalProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id,
      start_at: format(new Date(data.start_at), 'yyyy-MM-dd'),
      end_at: format(new Date(data.end_at), 'yyyy-MM-dd'),
      name: data?.name,
      cpf: data?.cpf,
      rg: data?.rg,
      phone: data?.phone,
      email: data?.email,
      cep: data?.cep,
      address: data?.address,
      district: data?.district,
      city: data?.city,
    },
  })

  function handleUpdateReservation(data: any) {
    fn(data, true)
    setOpen(!open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <TooltipComponent label="editar">
        <Dialog.Trigger asChild>
          <button className={ActionButton({ color: 'yellow' })}>
            <Pencil size={18} />
          </button>
        </Dialog.Trigger>
      </TooltipComponent>
      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>Editar Reserva</DialogTitle>

          <DialogDescription>
            Altere os dados que deseja atualizar.
          </DialogDescription>

          <form onSubmit={handleSubmit(handleUpdateReservation)}>
            <Input type="hidden" {...register('id')} />

            <Fieldset>
              <Label htmlFor="name">Nome</Label>
              <Input type="text" required id="name" {...register('name')} />
            </Fieldset>

            <Flex css={{ gap: '1rem' }}>
              <Fieldset>
                <Label htmlFor="rg">RG</Label>
                <Input type="text" required id="rg" {...register('rg')} />
              </Fieldset>

              <Fieldset>
                <Label htmlFor="cpf">CPF</Label>
                <Input type="text" required id="cpf" {...register('cpf')} />
              </Fieldset>
            </Flex>

            <Flex css={{ gap: '1rem' }}>
              <Fieldset>
                <Label htmlFor="phone">Telefone</Label>
                <Input type="text" required id="phone" {...register('phone')} />
              </Fieldset>

              <Fieldset>
                <Label htmlFor="email">Email</Label>
                <Input type="text" required id="email" {...register('email')} />
              </Fieldset>
            </Flex>

            <Fieldset>
              <Label htmlFor="cep">CEP</Label>
              <Input type="text" required id="cep" {...register('cep')} />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="address">Endereço</Label>
              <Input
                type="text"
                required
                id="address"
                {...register('address')}
              />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="district">Bairro</Label>
              <Input
                type="text"
                required
                id="district"
                {...register('district')}
              />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="city">Cidade</Label>
              <Input type="text" required id="city" {...register('city')} />
            </Fieldset>

            <Flex css={{ justifyContent: 'space-between' }}>
              <Fieldset>
                <Label htmlFor="start_at">Data Inicial</Label>
                <Input
                  type="date"
                  required
                  id="start_at"
                  {...register('start_at')}
                />
              </Fieldset>

              <Fieldset>
                <Label htmlFor="end_at">Data Final</Label>
                <Input
                  type="date"
                  required
                  id="end_at"
                  {...register('end_at')}
                />
              </Fieldset>
            </Flex>

            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
              <Button type="submit" variant="yellow">
                Editar
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
  )
}
