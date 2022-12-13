import { styled, keyframes } from '@stitches/react'
import { violet, blackA, red, blue } from '@radix-ui/colors'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const AlertDialogOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const AlertDialogContent = styled(AlertDialog.Content, {
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

export const AlertDialogTitle = styled(AlertDialog.Title, {
  margin: 0,
  fontSize: '1rem',
  fontWeight: 500,
  marginBottom: 20,
})

export const AlertDialogDescription = styled(AlertDialog.Description, {
  marginBottom: 20,
  color: blackA.blackA12,
  fontSize: 15,
  lineHeight: 1.5,
})

export const AlertDialogButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: '1rem',
  lineHeight: 1,
  fontWeight: 500,
  height: 36,
  cursor: 'pointer',

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: blue.blue3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red11,
        '&:hover': { backgroundColor: red.red5 },
        '&:focus': { boxShadow: `0 0 0 2px ${red.red7}` },
      },
      blue: {
        backgroundColor: blue.blue4,
        color: blue.blue11,
        '&:hover': { backgroundColor: blue.blue5 },
        '&:focus': { boxShadow: `0 0 0 2px ${blue.blue7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
})
