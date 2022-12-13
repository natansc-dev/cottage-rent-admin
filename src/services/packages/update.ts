import { api } from '../api'

interface PackageProps {
  id?: string
  start_at: string
  end_at: string
  title: string
}

export async function updatePackage(data: PackageProps) {
  const response = await api
    .put(`/packages/${data.id}`, {
      start_at: data.start_at,
      end_at: data.end_at,
      title: data.title,
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
