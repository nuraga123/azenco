import { createEffect } from 'effector-next'

import api from '@/app/axiosClient'
import { IAddToCart } from '@/types/shopping-cart'

export const getCartItemsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const addToCartFx = createEffect(
  async ({ url, username, partId }: IAddToCart) => {
    const { data } = await api.post(url, {
      username,
      partId,
    })

    return data
  }
)

export const removeFromCartFx = createEffect(async (url: string) => {
  await api.delete(url)
})
