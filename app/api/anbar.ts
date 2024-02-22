import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { getLocalStorageUser } from '@/localStorageUser'
import { addProductFxProps } from '@/types/products'
import { ITransferSend } from '@/types/anbar'

export const getAnbarsFx = createEffect(async (url: string) => {
  try {
    const { tokenStorage } = getLocalStorageUser()
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${tokenStorage}`,
      },
    })

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getAnbarOneFx = createEffect(async (url: string) => {
  try {
    const { tokenStorage } = getLocalStorageUser()
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${tokenStorage}`,
      },
    })

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const addProductFx = createEffect(
  async ({ url, new__product }: addProductFxProps) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(url, new__product, {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      })

      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const productsAnbarSendToUserFx = createEffect(
  async ({ url, transfer }: ITransferSend) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(url, transfer, {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      })

      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)
