import { styled } from '../../styles'
import { mauve, gray, blue } from '@radix-ui/colors'
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
  backgroundColor: 'white',
  padding: '0 20px',
  height: 92,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  lineHeight: 1,
  color: gray.gray11,
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { color: blue.blue11 },
  '&[data-state="active"]': {
    color: blue.blue11,
    borderBottom: `2px solid ${blue.blue11}`,
  },
  variants: {
    media: {
      lg: {
        height: 46,
      },
    },
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

export const SignOutButton = styled('button', {
  all: 'unset',
  lineHeight: 0,
  cursor: 'pointer',
  padding: '0.4rem',
  borderRadius: 6,

  svg: {
    fontSize: '58px',
    color: blue.blue10,
  },

  variants: {
    media: {
      lg: {
        svg: {
          fontSize: '18px',
        },
      },
    },
  },
})

export const Header = styled('header', {
  display: 'flex',
  borderBottom: `1px solid ${gray.gray4}`,
  padding: '1rem',

  img: {
    width: 328,
    margin: '0 auto',
  },

  variants: {
    media: {
      lg: {
        img: {
          width: 128,
          margin: '0 auto',
        },
      },
    },
  },
})
