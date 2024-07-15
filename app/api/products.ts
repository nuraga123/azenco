import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { IGetSearchNameWordProduct, addProductFxProps } from '@/types/products'
import { getLocalStorageUser } from '@/localStorageUser'

export const postImportProductsFx = createEffect(
  async ({ admin, str }: { admin: string; str: string }) => {
    try {
      if (process.env.NEXT_PUBLIC_ADMIN_NAME === admin) {
        const { tokenStorage } = getLocalStorageUser()
        const { data } = await api.post(
          '/products/import',
          {
            products: str,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenStorage}`,
            },
          }
        )
        return data
      } else {
        alert('Admin name does not match')
      }
    } catch (error) {
      console.log('Error during product import:', error)
    }
  }
)

export interface IGetProducts {
  limit: number
  offset: number
  sortBy: 'asc' | 'desc'
}

export const getProductsFx = createEffect(
  async ({ limit, offset, sortBy }: IGetProducts) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.get(
        `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}`,
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

export const getSearchNameWordProductFx = createEffect(
  async ({ part_name }: IGetSearchNameWordProduct) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(
        '/products/search-part-name',
        { part_name },
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

export const postSearchNameAndAzencoCodeFiltersPorudctsFx = createEffect(
  async ({
    sortBy,
    type,
    searchValue,
    priceFrom,
    priceTo,
  }: {
    sortBy: 'asc' | 'desc'
    type: 'name' | 'code'
    searchValue: string
    priceFrom?: string
    priceTo?: string
  }) => {
    try {
      const { tokenStorage } = getLocalStorageUser()
      const { data } = await api.post(
        `/products/filter`,
        {
          sortBy,
          type,
          searchValue,
          priceFrom,
          priceTo,
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
