import { api } from '../api'

interface ReservationProps {
  id?: string
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
  const response = await api
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
