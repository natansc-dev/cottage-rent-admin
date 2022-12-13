import * as Dialog from '@radix-ui/react-dialog'

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
import { ReactNode, useState } from 'react'
import { TooltipComponent } from '../Tooltip'

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
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      start_at: new Date(data.start_at),
      end_at: new Date(data.end_at),
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
    </Dialog.Root>
  )
}
