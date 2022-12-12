import { styled } from '@stitches/react'
import { globalCss } from '.'
import { blackA, gray, blue, red, yellow, green } from '@radix-ui/colors'

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
