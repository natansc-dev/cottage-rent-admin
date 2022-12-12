import { api } from '../api'

export async function deletePackage(id: string) {
  const response = await api
    .delete(`/packages/${id}`)
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
