import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { ReactNode } from 'react'
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
  Button,
  Flex,
} from './styles'

interface AlertDialogProps {
  children: ReactNode
}

export function AlertDialogComponent({ children }: AlertDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>

          <Flex css={{ justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <Button variant="mauve" css={{ marginRight: 25 }}>
                Cancelar
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button variant="red">Sim, deletar interessado(a)</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
