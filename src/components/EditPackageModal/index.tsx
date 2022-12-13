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
  id: z.string(),
  start_at: z.date(),
  end_at: z.date(),
  title: z.string(),
})

type FormInputs = z.infer<typeof formSchema>

interface EditPackageModalProps {
  data: {
    id: string
    start_at: string
    end_at: string
    title: string
  }
  fn: (data: any, updated: boolean) => void
}

export function EditPackageModal({ data, fn }: EditPackageModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id,
      start_at: new Date(data?.start_at),
      end_at: new Date(data?.end_at),
      title: data?.title,
    },
  })

  function handleUpdateReservation(data: any) {
    fn(data, true)
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Editar Pacote</DialogTitle>

        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>

        <form onSubmit={handleSubmit(handleUpdateReservation)}>
          <Input type="hidden" {...register('id')} />

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
  )
}
