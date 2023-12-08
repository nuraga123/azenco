import { toast } from 'react-toastify'
import {
  addToCartFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/app/api/shopping-cart'

import {
  removeShoppingCart,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'

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
    const data = await updateCartItemFx({
      url: `/shopping-cart/total-price/${partId}`,
      payload: { total_price },
    })

    updateCartItemTotalPrice({ partId, total_price: data.total_price })
  } catch (error) {
    console.log(error)
    toast.error('')
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
