import { ReactNode } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { styled, keyframes } from '@stitches/react'
import { violet, blackA, red, mauve } from '@radix-ui/colors'
import { deleteInterest } from '../../services/interests/delete'
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
        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>

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

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const AlertDialogOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const AlertDialogContent = styled(AlertDialog.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': { outline: 'none' },
})

const AlertDialogTitle = styled(AlertDialog.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
})

const AlertDialogDescription = styled(AlertDialog.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
})

const Flex = styled('div', { display: 'flex' })

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red11,
        '&:hover': { backgroundColor: red.red5 },
        '&:focus': { boxShadow: `0 0 0 2px ${red.red7}` },
      },
      mauve: {
        backgroundColor: mauve.mauve4,
        color: mauve.mauve11,
        '&:hover': { backgroundColor: mauve.mauve5 },
        '&:focus': { boxShadow: `0 0 0 2px ${mauve.mauve7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
})
