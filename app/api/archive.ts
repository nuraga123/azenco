import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'

export const getArchiveAll = createEffect(async () => {
  try {
    const { data } = await api.get('history/all')
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})
