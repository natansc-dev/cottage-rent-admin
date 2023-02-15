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
} from '../../styles/global'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { deleteInterest } from '../../services/interests/delete'
import { format } from 'date-fns'
import InputMask from 'react-input-mask'
import { api } from '../../services/api'

const formSchema = z.object({
  start_at: z.string(),
  end_at: z.string(),
  name: z.string().min(3),
  cpf: z.string(),
  rg: z.string(),
  phone: z.string(),
  email: z.string().email(),
  cep: z.string(),
  address: z.string(),
  district: z.string(),
  city: z.string(),
  payment_method: z.string(),
})

type FormInputs = z.infer<typeof formSchema>

interface NewReservationModalProps {
  data?: {
    id: string
    start_at: string
    end_at: string
    name: string
    phone: string
  }
  fn: (data: any, created: boolean) => void
}

export function NewReservationModal({ data, fn }: NewReservationModalProps) {
  const interestId = data?.id
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      phone: data?.phone,
      start_at:
        data?.start_at && format(new Date(data?.start_at), 'yyyy-MM-dd'),
      end_at: data?.end_at && format(new Date(data?.end_at), 'yyyy-MM-dd'),
    },
  })

  async function handleNewReservation(data: any) {
    fn(data, true)

    reset()

    if (interestId) {
      await deleteInterest(interestId)
    }
  }

  async function checkCEP(e: any) {
    const cep = e.target.value.replace(/\D/g, '')
    await api
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        console.log(response)
        setValue('address', response.data.logradouro)
        setValue('district', response.data.bairro)
        setValue('city', response.data.localidade)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Nova Reserva</DialogTitle>

        <DialogDescription>Preencha o formulário abaixo.</DialogDescription>

        <form onSubmit={handleSubmit(handleNewReservation)}>
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
              <InputMask
                id="cpf"
                type="text"
                mask="999.999.999-99"
                maskChar=" "
                required
                {...register('cpf')}
              />
            </Fieldset>
          </Flex>

          <Flex css={{ gap: '1rem' }}>
            <Fieldset>
              <Label htmlFor="phone">Telefone</Label>
              <InputMask
                type="text"
                mask="+55 (99) 9 9999-9999"
                maskChar=" "
                required
                {...register('phone')}
              />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="email">Email</Label>
              <Input type="email" required id="email" {...register('email')} />
            </Fieldset>
          </Flex>

          <Fieldset>
            <Label htmlFor="cep">CEP</Label>
            <InputMask
              id="cep"
              type="text"
              mask="99999-999"
              maskChar=" "
              required
              {...register('cep')}
              onBlur={checkCEP}
            />
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
                {...register('start_at')}
              />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="end_at">Data Final</Label>
              <Input type="date" required id="end_at" {...register('end_at')} />
            </Fieldset>
          </Flex>

          <Fieldset>
            <Label htmlFor="payment_method">Forma de Pagamento</Label>
            <Input
              type="text"
              required
              id="payment_method"
              {...register('payment_method')}
            />
          </Fieldset>

          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <Button type="submit">Reservar</Button>
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
