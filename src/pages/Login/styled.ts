import { styled } from '../../styles'

export const LoginContainer = styled('section', {
  height: '100vh',

  variants: {
    media: {
      lg: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
})

export const LeftGrid = styled('div', {
  display: 'none',

  variants: {
    media: {
      lg: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        padding: '5rem',
        color: '$white',

        h1: {
          fontSize: '2.5rem',
          marginBottom: '1.25rem',
        },

        p: {
          fontSize: '1.25rem',
        },
      },
    },
  },
})

export const RightGrid = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',

  background: 'rgba(41, 41, 41, 0.39)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(50px)',

  color: '$white',
  padding: '2rem',

  img: {
    width: '92%',
    height: 'auto',
  },

  h1: {
    fontSize: '6.5rem',
    fontWeight: 800,
  },

  p: {
    fontSize: '2.25rem',
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
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',

  input: {
    width: '100%',
    height: '92px',
    padding: '1rem 0',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',

    fontSize: '2.25rem',
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
    width: '100%',
    backgroundColor: '#060606',
    border: '2px solid #060606',
    color: 'white',
    borderRadius: '6px',
    padding: '2.25rem',
    marginTop: '3rem',
    fontSize: '2rem',

    cursor: 'pointer',
    transition: 'all 0.2s ease -in -out',

    '&:hover': {
      backgroundColor: 'transparent',
      border: '2px solid #e0e0e0',
    },
  },

  variants: {
    media: {
      md: {},
      lg: {},
    },
  },
})
