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
  await api
    .post('/reservations', data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
