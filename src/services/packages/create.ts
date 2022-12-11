import { api } from '../api'

interface PackageProps {
  end_at: string
  start_at: string
  title: string
}

export async function createPackage(data: PackageProps) {
  const response = await api
    .post('/packages', data)
    .then((response) => {
      return {
        status: response.status,
        message: response.statusText,
        data: {
          id: response.data.id,
          end_at: response.data.end_at,
          start_at: response.data.start_at,
          title: response.data.title,
        },
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
