import { styled } from '../../styles'

export const LoginContainer = styled('section', {
  display: 'grid',
  height: '100vh',
  gridTemplateColumns: 'repeat(1, 1fr)',

  variants: {
    media: {
      lg: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
})

export const LeftGrid = styled('div', {
  flexDirection: 'column',
  justifyContent: 'end',
  padding: '5rem',
  display: 'none',
  color: '$white',

  h1: {
    fontSize: '2.5rem',
    marginBottom: '1.25rem',
  },

  p: {
    fontSize: '1.25rem',
  },

  variants: {
    media: {
      lg: {
        display: 'flex',
      },
    },
  },
})

export const RightGrid = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: 'rgba(41, 41, 41, 0.39)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(50px)',

  color: '$white',
  padding: '1.25rem',

  h1: {
    fontSize: '2.5rem',
    fontWeight: 800,
  },

  p: {
    fontSize: '1.25rem',
    marginBottom: '2.55rem',
  },

  variants: {
    media: {
      lg: {
        padding: '5rem 0 0 8rem',
      },
    },
  },
})

export const LoginForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',

  input: {
    padding: '1rem 0',
    height: '48px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    maxWidth: '430px',

    fontSize: '1.25rem',
    color: '#fcfcfc',

    '&:focus': {
      border: 0,
      outline: 'none',
      borderBottom: '2px solid #348fc6',
    },
  },

  'input + input': {
    marginTop: '1rem',
  },

  button: {
    backgroundColor: '#060606',
    border: '2px solid #060606',
    color: 'white',
    borderRadius: '6px',
    maxWidth: '430px',
    padding: '1.25rem 2.25rem',
    marginTop: '3rem',

    cursor: 'pointer',
    transition: 'all 0.2s ease -in -out',
    '&:hover': {
      backgroundColor: 'transparent',
      border: '2px solid #e0e0e0',
    },
  },
})

export const TopContent = styled('form', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  img: {
    width: 280,
  },

  span: {
    fontSize: '1.25rem',
    fontWeight: 600,
  },

  variants: {
    media: {
      md: {
        marginBottom: '7.5rem',
      },
    },
  },
})
