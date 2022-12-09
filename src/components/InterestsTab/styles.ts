import { styled } from '@stitches/react'
import { blackA, gray, blue, red, yellow, green } from '@radix-ui/colors'

export const InterestedContainer = styled('main', {
  flex: 1,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  h1: {
    fontSize: '1.5rem',
    color: `${blue.blue11}`,
  },
})

export const InterestedList = styled('div', {
  flex: 1,
  overflow: 'auto',
  marginTop: '2rem',
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWwidth: '600px',
    th: {
      background: 'white',
      padding: '1rem',
      textAlign: 'left',
      color: `${blackA.blackA12}`,
      fontSize: '0.875rem',
      lineHeight: 1.6,
      '&:first-child': {
        borderTopLeftRadius: 6,
      },
      '&:last-child': {
        borderTopRightRadius: 6,
        paddingRight: '1.5rem',
      },
    },
    td: {
      borderTop: `2px solid ${gray.gray8}`,
      padding: '1rem',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      '&:first-child': {
        width: '30%',
        paddingLeft: '1.5rem',
      },
      '&:last-child': {
        paddingRight: '1.5rem',
      },
    },
    tbody: {
      tr: {
        background: 'white',
        '&:hover': {
          background: `${gray.gray2}`,
        },
      },
    },
  },
})
