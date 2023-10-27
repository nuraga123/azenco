import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'

export const showAuthError = (error: unknown) => {
  const axiosError = error as AxiosError

  if (axiosError.response) {
    if (axiosError.response.status === HTTPStatus.UNAUTHORIZED) {
      toast.error('Daxil etdiyiniz istifadəçi adı və ya parol səhvdir')
      return
    }
  }

  toast.error((error as Error).message)
}
