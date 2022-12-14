import { api } from '../api'

export async function reservationContract(id: string) {
  const response = await api
    .post(`/reservations/contract/${id}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      return {
        status: error.response.status,
        message: error.response.data.message,
      }
    })

  return response
}
