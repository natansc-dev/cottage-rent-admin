import { styled } from '@stitches/react'
import { blackA, gray, blue, green } from '@radix-ui/colors'
import { Repeat } from 'phosphor-react'

export const PackageContainer = styled('main', {
  flex: 1,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
})

export const PackageGrid = styled('div', {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  marginTop: '2rem',
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
    borderBottom: `1px solid ${gray.gray8}`,
    marginBottom: '1rem',
    padding: '1rem 0',
  },

  h2: {
    fontSize: '1.25rem',
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
