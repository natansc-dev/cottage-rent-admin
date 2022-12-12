import { api } from '../api'

interface ReservationProps {
  start_at: string
  end_at: string
  name: string
  phone: string
  address: string
  cep: string
  city: string
  cpf: string
  district: string
  email: string
  rg: string
}

export async function createReservation(data: ReservationProps) {
  const response = await api
    .post('/reservations', data)
    .then((response) => {
      return {
        status: response.status,
        message: response.statusText,
      }
    })
    .catch((error) => {
      return {
        status: error.response.status,
        message: error.response.data.message,
      }
    })

  return response
}
