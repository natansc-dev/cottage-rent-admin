import { styled } from '@stitches/react'
import { mauve, blackA, gray, blue, red } from '@radix-ui/colors'
import * as Tabs from '@radix-ui/react-tabs'

export const TabsRoot = styled(Tabs.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
})

export const TabsList = styled(Tabs.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: `1px solid ${mauve.mauve6}`,
})

export const TabsTrigger = styled(Tabs.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'white',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: mauve.mauve11,
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { color: blue.blue11 },
  '&[data-state="active"]': {
    color: blue.blue11,
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
})

export const TabsContent = styled(Tabs.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: `${gray.gray4}`,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: 'none',
})

export const Text = styled('p', {
  marginTop: 0,
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
})

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
      button: {
        all: 'unset',
        lineHeight: 0,
        cursor: 'pointer',
        svg: {
          color: `${red.red8}`,
        },
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
