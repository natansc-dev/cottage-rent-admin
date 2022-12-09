import { api } from '../api'

export async function deleteInterest(id: string) {
  await api
    .delete(`/interests/${id}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
