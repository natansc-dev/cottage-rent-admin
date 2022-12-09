import { api } from '../api'

export async function deleteReservation(id: string) {
  await api
    .delete(`/reservations/${id}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
