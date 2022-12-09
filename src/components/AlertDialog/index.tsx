import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { deleteInterest } from '../../services/interests/delete'
import { deleteReservation } from '../../services/reservations/delete'
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
  Button,
  Flex,
} from './styles'
interface DeleteModalProps {
  remove?: 'interest' | 'reservation' | 'package'
  id: string
}

export default function DeleteModal({ id, remove }: DeleteModalProps) {
  async function handleDelete() {
    switch (remove) {
      case 'interest':
        await deleteInterest(id)
        break

      case 'reservation':
        await deleteReservation(id)
        break

      case 'package':
        break

      default:
        break
    }
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
            <Button variant="mauve" css={{ marginRight: 25 }}>
              Cancelar
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action asChild>
            <Button variant="red" onClick={handleDelete}>
              Sim, deletar interessado(a)
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialogContent>
    </AlertDialog.Portal>
  )
}
