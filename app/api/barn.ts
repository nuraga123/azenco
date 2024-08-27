import { createEffect } from 'effector-next'

import api from '@/app/axiosClient'
import { getLocalStorageUser } from '@/localStorageUser'
import { IFindBarnsOfProductData, IStocksBarn, ICreateBarn } from '@/types/barn'

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

// create new barn
export const createBarnProductFx = createEffect(
  async (newBarn: ICreateBarn) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post('/barn/create', newBarn, {
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

export const postReduceStocksBarn = createEffect(
  async (stocks: IStocksBarn) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post('barn/reduce-stocks', stocks, {
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

export const deleteMaterialBarn = createEffect(async (barnId: number) => {
  try {
    const { tokenStorage } = getLocalStorageUser()
    const { data } = await api.delete(`barn/remove/${barnId}`, {
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

export const postFindBarnsOfProductFx = createEffect(
  async (productData: IFindBarnsOfProductData) => {
    try {
      const { tokenStorage } = getLocalStorageUser()

      const { data } = await api.post(`barn/find-barns`, productData, {
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
