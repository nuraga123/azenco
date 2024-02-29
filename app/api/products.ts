import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { IGetSearchNameProduct, addProductFxProps } from '@/types/products'
import { getLocalStorageUser } from '@/localStorageUser'

export const getProductsFx = createEffect(async (url: string) => {
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

export const getSearchNameProductFx = createEffect(
  async ({ url, search_word }: IGetSearchNameProduct) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(
        url,
        { search_word },
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
