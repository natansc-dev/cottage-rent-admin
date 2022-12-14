import { styled } from '../../../styles'
import { blackA, gray, blue, green } from '@radix-ui/colors'
import { Repeat } from 'phosphor-react'

export const PackageContainer = styled('main', {
  flex: 1,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
})

export const PackageGrid = styled('div', {
  marginTop: '2rem',

  variants: {
    media: {
      lg: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
})

export const PackageCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  minWidth: '300px',
  height: '100%',
  border: `2px solid ${gray.gray8}`,
  boxShadow: '0 4px 6px rgb(0 0 0 / 4 %)',
  transition: 'box-shadow .15s ease',
  padding: '1rem',

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${gray.gray8}`,
    marginBottom: '1rem',
    paddingBottom: '1rem',
  },

  h2: {
    fontSize: '2.25rem',
  },

  p: {
    fontSize: '1.25rem',
  },

  variants: {
    media: {
      lg: {
        h2: {
          fontSize: '1.25rem',
        },
        p: {
          fontSize: '1rem',
        },
      },
    },
  },
})

export const AddNewPackageButton = styled('button', {
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
