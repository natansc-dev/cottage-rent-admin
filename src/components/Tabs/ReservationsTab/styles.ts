import { styled } from '@stitches/react'
import { blackA, gray, green } from '@radix-ui/colors'

export const InterestedContainer = styled('main', {
  flex: 1,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
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

export const AddNewReservationButton = styled('button', {
  maxWidth: 300,
  padding: '0.875rem',
  background: green.green10,
  borderRadius: 6,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${green.green10}`,
  cursor: 'pointer',
  marginTop: '1rem',

  '&:hover': {
    background: green.green11,
  },
})
