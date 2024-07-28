import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'

export const getArchiveAll = createEffect(async () => {
  try {
    const { data } = await api.get('archive/all')
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const findArchiveById = createEffect(async (id: number) => {
  try {
    const { data } = await api.get(`archive/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
})
