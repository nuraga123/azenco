import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { getLocalStorageUser } from '@/localStorageUser'
import { IAddAnbarProduct, ITransferSend } from '@/types/anbar'

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
export const getAnbarsUsernameFx = createEffect(async () => {
  try {
    const { tokenStorage, usernameStorage } = getLocalStorageUser()
    const { data } = await api.post(
      'anbar/usernames',
      {
        name: usernameStorage,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      }
    )

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

export const addAnbarProductFx = createEffect(
  async ({ url, productId, stock, username }: IAddAnbarProduct) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(
        url,
        {
          username,
          productId,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      )

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
