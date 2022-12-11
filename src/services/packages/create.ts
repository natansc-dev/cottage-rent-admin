import { api } from '../api'

interface PackageProps {
  end_at: string
  start_at: string
  title: string
}

export async function createPackage(data: PackageProps) {
  await api
    .post('/packages', data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
