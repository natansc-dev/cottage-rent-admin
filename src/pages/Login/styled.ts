import styled from 'styled-components'

export const LoginContainer = styled.main`
  display: grid;
  height: 100vh;

  @media (min-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const LeftGrid = styled.div`
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

  @media (min-width: 320px) {
    display: none;
  }

  @media (min-width: 375px) {
    display: none;
  }

  @media (min-width: 425px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: flex;
    h1 {
      font-size: 1.65rem;
      font-weight: 800;
    }
    p {
      font-size: 1rem;
    }
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`

export const RightGrid = styled.div`
  display: flex;
  flex-direction: column;

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

  @media (min-width: 320px) {
    padding: 1.25rem;
  }

  @media (min-width: 375px) {
    padding: 1.25rem;
  }

  @media (min-width: 425px) {
    padding: 1.25rem;
  }

  @media (min-width: 768px) {
    padding-top: 5rem;
    padding-left: 3rem;
  }

  @media (min-width: 1024px) {
    padding-top: 5rem;
    padding-left: 8rem;
  }
`

export const TopContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media (min-width: 320px) {
    margin-bottom: 2.5rem;
    img {
      width: 280px;
    }
  }

  @media (min-width: 375px) {
    margin-bottom: 2.5rem;
    img {
      width: 280px;
    }
  }

  @media (min-width: 425px) {
    margin-bottom: 2.5rem;
    img {
      width: 280px;
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 7.5rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 7.5rem;
  }
`
