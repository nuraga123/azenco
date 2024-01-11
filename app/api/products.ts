import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { getLocalStorageUser } from '@/localStorageUser'

export const getProductsFx = createEffect(async (url: string) => {
  try {
    const token = getLocalStorageUser().token
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})
