import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import {
  addToCartFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/app/api/shopping-cart'

import {
  removeShoppingCart,
  setTotalPrice,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'
import { IShoppingCartItem } from '@/types/shopping-cart'

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${partId}`)
      removeShoppingCart(partId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      username,
      partId,
    })

    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const removeItemFromCart = async (partId: number) => {
  try {
    await removeFromCartFx(`/shopping-cart/one/${partId}`)
    removeShoppingCart(partId)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
  try {
    if (total_price && partId) {
      const data = await updateCartItemFx({
        url: `/shopping-cart/total-price/${partId}`,
        payload: { total_price },
      })
      console.log(data)
      console.log(`total_price: ${total_price}`)

      updateCartItemTotalPrice({ partId, total_price: data?.total_price })
    }
  } catch (error) {
    console.log((error as AxiosError).message)
  }
}

export const formatFromPriceToString = (value: number): string => {
  if (value) {
    if (value.toString().includes('.')) {
      return Number(value.toString()).toFixed(2)
    }
    return value.toString()
  } else {
    return '0'
  }
}

export const calculatedTotalPrice = (
  shoppingCart: IShoppingCartItem[]
): number => {
  const total_price: number = shoppingCart
    .filter((el) => el.in_stock !== 0)
    .reduce(
      (defaultCount: number, item: IShoppingCartItem) =>
        defaultCount + Number(item.total_price),
      0
    )

  // Обновление состояния
  setTotalPrice(total_price)
  console.log(+formatFromPriceToString(total_price))
  return total_price
}
