import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Flex } from '../../styles/global'
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogButton,
} from './styles'

interface DeleteModalProps {
  id: string
  fn: (id: string, deleted: boolean) => void
}

export default function DeleteModal({ id, fn }: DeleteModalProps) {
  function handleClickButtonDelete(id: string, deleted: boolean) {
    fn(id, deleted)
  }

  return (
    <AlertDialog.Portal>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogTitle>
          Você tem certeza absoluta, que deseja excluir?
        </AlertDialogTitle>

        <Flex css={{ justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <AlertDialogButton variant="mauve" css={{ marginRight: 25 }}>
              Cancelar
            </AlertDialogButton>
          </AlertDialog.Cancel>

          <AlertDialog.Action asChild>
            <AlertDialogButton
              variant="red"
              onClick={() => handleClickButtonDelete(id, true)}
            >
              Sim, deletar!
            </AlertDialogButton>
          </AlertDialog.Action>
        </Flex>
      </AlertDialogContent>
    </AlertDialog.Portal>
  )
}
