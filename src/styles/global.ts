import { styled, keyframes } from '@stitches/react'
import { globalCss } from '.'
import { blackA, gray, blue, red, yellow, green } from '@radix-ui/colors'
import * as Dialog from '@radix-ui/react-dialog'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Manrope',
    fontSize: '1rem',
    fontWeight: 400,
  },

  h1: {
    fontSize: '2rem',
    color: `${blue.blue11}`,
  },
})

export const ActionButton = styled('button', {
  all: 'unset',
  lineHeight: 0,
  cursor: 'pointer',
  padding: '0.4rem',
  borderRadius: 6,
  border: `2px solid ${gray.gray8}`,
  background: 'transparent',
  variants: {
    color: {
      red: {
        svg: { color: `${red.red10}` },
        '&:hover': {
          svg: { color: 'white' },
          background: `${red.red10}`,
          border: `2px solid ${red.red10}`,
        },
      },
      yellow: {
        svg: {
          color: `${yellow.yellow10}`,
        },
        '&:hover': {
          svg: { color: 'white' },
          background: `${yellow.yellow10}`,
          border: `2px solid ${yellow.yellow10}`,
        },
      },
      green: {
        svg: {
          color: `${green.green10}`,
        },
        '&:hover': {
          svg: { color: 'white' },
          background: `${green.green10}`,
          border: `2px solid ${green.green10}`,
        },
      },
    },
  },

  '&+button': {
    marginLeft: 8,
  },
})

export const ActionGroup = styled('span', {
  display: 'flex',
  gap: 8,
})

export const Flex = styled('div', {
  display: 'flex',
})

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogContent = styled(Dialog.Content, {
  overflow: 'auto',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
})

export const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 'bold',
  color: blackA.blackA12,
  fontSize: '1rem',
})

export const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: blackA.blackA12,
  fontSize: 15,
  lineHeight: 1.5,
})

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: '1rem',
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
      yellow: {
        backgroundColor: yellow.yellow4,
        color: yellow.yellow11,
        '&:hover': { backgroundColor: yellow.yellow5 },
        '&:focus': { boxShadow: `0 0 0 2px ${yellow.yellow7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'green',
  },
})

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: red.red11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: red.red4 },
  '&:focus': { boxShadow: `0 0 0 2px ${red.red7}` },
})

export const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginBottom: 15,
})

export const Label = styled('label', {
  fontSize: '1rem',
  color: blackA.blackA12,
  width: '100%',
})

export const Input = styled('input', {
  width: '100%',
  border: 'none',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: '1rem',
  lineHeight: 1,
  color: blackA.blackA12,
  boxShadow: `0 0 0 1px ${blackA.blackA10}`,
  height: 36,

  '&:focus': { boxShadow: `0 0 0 2px ${blue.blue8}` },
})
