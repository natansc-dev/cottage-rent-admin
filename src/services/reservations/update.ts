import { api } from '../api'

interface ReservationProps {
  id: string
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

export async function updateReservation(data: ReservationProps) {
  await api
    .put(`/reservations/${data.id}`, {
      start_at: data.start_at,
      end_at: data.end_at,
      name: data.name,
      phone: data.phone,
      address: data.address,
      cep: data.cep,
      cpf: data.cpf,
      district: data.district,
      email: data.email,
      rg: data.rg,
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
