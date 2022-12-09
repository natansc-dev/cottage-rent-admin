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

const formSchema = z.object({
  // start_at: z.string(),
  // end_at: z.string(),
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

interface ModalProps {
  data: {
    start_at: string
    end_at: string
    name: string
    phone: string
  }
}

export function Modal({ data }: ModalProps) {
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

  function createNewReservation(data: any) {
    console.log(data)
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Adiciona Reserva</DialogTitle>

        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>

        <form onSubmit={handleSubmit(createNewReservation)}>
          <Fieldset>
            <Label htmlFor="name">Nome</Label>
            <Input type="text" required id="name" {...register('name')} />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="rg">RG</Label>
            <Input type="text" required id="rg" {...register('rg')} />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="cpf">CPF</Label>
            <Input type="text" required id="cpf" {...register('cpf')} />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="phone">Telefone</Label>
            <Input type="text" required id="phone" {...register('phone')} />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="email">Email</Label>
            <Input type="text" required id="email" {...register('email')} />
          </Fieldset>

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

          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <Button type="submit" variant="green">
              Reservar
            </Button>
          </Flex>
        </form>

        <Dialog.Close asChild>
          <IconButton aria-label="Close">
            <X size={24} />
          </IconButton>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  )
}
