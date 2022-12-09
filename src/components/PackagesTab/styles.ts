import { styled } from '@stitches/react'
import { blackA, gray, blue } from '@radix-ui/colors'
import { Repeat } from 'phosphor-react'

export const PackageContainer = styled('main', {
  flex: 1,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  h1: {
    fontSize: '1.5rem',
    color: `${blue.blue11}`,
  },
})

export const PackageGrid = styled('div', {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
})

export const PackageCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: blue.blue11,
  borderRadius: 6,
  overflow: 'hidden',
  minWidth: '300px',
  height: '100%',
  border: `1px solid ${gray.gray8}`,
  boxShadow: '0 4px 6px rgb(0 0 0 / 4 %)',
  transition: 'box-shadow .15s ease',
  padding: '1rem',
})
