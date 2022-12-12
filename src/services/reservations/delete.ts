import { api } from '../api'

export async function deleteReservation(id: string) {
  const response = await api
    .delete(`/reservations/${id}`)
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
