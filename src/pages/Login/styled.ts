import styled from 'styled-components'

export const LoginContainer = styled.main`
  @media (min-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 100vh;
  }
`

export const LeftGrid = styled.div`
  @media (min-width: 320px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
    }

    p {
      font-size: 1.25rem;
    }
  }
`

export const RightGrid = styled.div`
  @media (min-width: 320px) {
    padding: 2rem;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    padding-top: 5rem;
    padding-left: 8rem;

    background: rgba(41, 41, 41, 0.39);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
    }

    p {
      font-size: 1.25rem;
      margin-bottom: 2.55rem;
    }

    form {
      display: flex;
      flex-direction: column;

      input {
        padding: 1rem 0;
        height: 48px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        max-width: 430px;

        font-size: 1.25rem;
        color: ${(props) => props.theme['gray-100']};

        &:focus {
          border: 0;
          outline: none;
          border-bottom: 2px solid #348fc6;
        }
      }

      input + input {
        margin-top: 1rem;
      }

      button {
        background-color: ${(props) => props.theme['gray-900']};
        border: 2px solid ${(props) => props.theme['gray-900']};
        color: white;
        border-radius: 6px;
        max-width: 430px;
        padding: 1.25rem 2.25rem;
        margin-top: 3rem;

        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: transparent;
          border: 2px solid #e0e0e0;
        }
      }
    }
  }
`

export const TopContent = styled.div`
  @media (min-width: 320px) {
    margin-bottom: 2.5rem;
    img {
      width: 280px;
    }
  }
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 7.5rem;

    span {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
`
