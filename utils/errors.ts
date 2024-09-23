import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'

export const showAuthError = (error: unknown) => {
  const axiosError = error as AxiosError
  console.log(axiosError)

  if (axiosError.response) {
    if (axiosError.response.status === HTTPStatus.UNAUTHORIZED) {
      toast.error('Daxil etdiyiniz istifadəçi parol səhvdir')
      return ''
    }
  }

  if (axiosError.message === 'Network Error') {
    toast.error(`serverə qoşulmayıb və ya internet yoxdur !`)
    return ''
  }

  toast.error((error as Error).message)
  return ''
}
