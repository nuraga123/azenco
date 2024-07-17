import { createEffect } from 'effector-next'

import api from '@/app/axiosClient'
import { getLocalStorageUser } from '@/localStorageUser'
import { ICreateAnbarProduct, ITransferSend } from '@/types/anbar'
import { IStocksBarn } from '@/types/barn'

export const getBarnByUserId = createEffect(async (id: number) => {
  try {
    // const { tokenStorage } = getLocalStorageUser()
    const { data } = await api.get(`barn/user/${+id}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getBarnById = createEffect(async (id: number) => {
  try {
    const { data } = await api.get(`barn/${+id}`)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getBarnsUsernameFx = createEffect(async () => {
  try {
    const { tokenStorage, usernameStorage } = getLocalStorageUser()
    const { data } = await api.post(
      '/barn/usersnames',
      {
        noname: usernameStorage,
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

// create new anbar
export const createAnbarProductFx = createEffect(
  async ({
    userId,
    productId,
    location,
    newStock,
    usedStock,
    brokenStock,
  }: ICreateAnbarProduct) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(
        '/barn/create',
        {
          userId,
          productId,
          location,
          newStock,
          usedStock,
          brokenStock,
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

export const postAddStocksBarn = createEffect(async (stocks: IStocksBarn) => {
  try {
    const { tokenStorage } = getLocalStorageUser()
    const { data } = await api.post('barn/add-stocks', stocks, {
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
