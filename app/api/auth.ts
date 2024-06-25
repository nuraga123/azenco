import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { ISingUpFx, ISignInFx } from '@/types/auth'
import api from '../axiosClient'
import { HTTPStatus } from '@/constans'

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISingUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('Регистрация прощла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password })

    toast.success('Вход выполнен!')
    console.log(data)

    return data
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    console.log(data)
    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }
    toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const getTokenFx = createEffect(async (token: string) => {
  try {
    const { data } = await api.post(
      '/users/validate-token',
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log(data)
    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const getWorkingServer = createEffect(async () => {
  try {
    const { data } = await api.get('/users/work')

    console.log(data)
    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const getUsersNamesServer = createEffect(async () => {
  try {
    const { data } = await api.get('/users/names')
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    toast.error((error as Error).message)
  }
})
