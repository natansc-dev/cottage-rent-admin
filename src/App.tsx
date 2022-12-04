import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { AuthProvider } from './context/AuthContext'
import { globalStyles } from './styles/global'

globalStyles()

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}
