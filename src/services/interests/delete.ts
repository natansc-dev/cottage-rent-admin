import { api } from '../api'

export async function deleteInterest(id: string) {
  const response = await api
    .delete(`/interests/${id}`)
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
