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
  title: z.string(),
})

type FormInputs = z.infer<typeof formSchema>

interface DataProps {
  id: string
  start_at: string
  end_at: string
  title: string
}
interface EditPackageModalProps {
  data: DataProps
  fn: (data: DataProps, updated: boolean) => void
}

export function EditPackageModal({ data, fn }: EditPackageModalProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      start_at: format(new Date(data.start_at), 'yyyy-MM-dd'),
      end_at: format(new Date(data.end_at), 'yyyy-MM-dd'),
      title: data.title,
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
          <ActionButton color="yellow">
            <Pencil size={18} />
          </ActionButton>
        </Dialog.Trigger>
      </TooltipComponent>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>Editar Pacote</DialogTitle>

          <DialogDescription>
            Altere os dados que deseja atualizar.
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
