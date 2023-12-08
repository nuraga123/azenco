import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { ISignInFx, ISingUpFx } from '@/types/auth'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'

export const signUpFx = createEffect(
  async ({ url, username, password, email }: ISingUpFx) => {
    const { data } = await api.post(url, {
      username,
      password,
      email,
    })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    toast.success('Qeydiyyat uğurla başa çatdı !'.toLocaleUpperCase())
    return data
  }
)

export const signInFx = createEffect(
  async ({ username, password, url }: ISignInFx) => {
    const { data } = await api.post(url, {
      username,
      password,
    })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    toast.success('Proqrama daxil oldunuz !'.toLocaleUpperCase())
    return data
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        console.log(axiosError.response.status)
        return false
      }
    }

    console.log((error as Error).message)
    toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
    toast.success('proqramdan çıxdınız !'.toLocaleUpperCase())
  } catch (error) {
    toast.error((error as Error).message)
  }
})
