import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
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
} from './styles'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createReservation } from '../../services/reservations/create'
import { deleteInterest } from '../../services/interests/delete'

const formSchema = z.object({
  start_at: z.date(),
  end_at: z.date(),
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

interface NewReservationModalProps {
  data: {
    id: string
    start_at: string
    end_at: string
    name: string
    phone: string
  }
  fn: (data: any, created: boolean) => void
}

export function NewReservationModal({ data, fn }: NewReservationModalProps) {
  const interestId = data.id
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      phone: data?.phone,
    },
  })

  async function handleCreateReservation(data: any) {
    fn(data, true)

    await deleteInterest(interestId)
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Adiciona Reserva</DialogTitle>

        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>

        <form onSubmit={handleSubmit(handleCreateReservation)}>
          <Fieldset>
            <Label htmlFor="name">Nome</Label>
            <Input type="text" required id="name" {...register('name')} />
          </Fieldset>

          <Flex>
            <Fieldset>
              <Label htmlFor="rg">RG</Label>
              <Input type="text" required id="rg" {...register('rg')} />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="cpf">CPF</Label>
              <Input type="text" required id="cpf" {...register('cpf')} />
            </Fieldset>
          </Flex>

          <Flex>
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
            <Input type="text" required id="address" {...register('address')} />
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
              Reservar
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
  )
}
