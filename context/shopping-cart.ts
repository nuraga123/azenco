import { createDomain } from 'effector-next'
import { IShoppingCartItem } from '@/types/shopping-cart'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const removeShoppingCart = shoppingCart.createEvent<number>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()

export const updateCartItemCount = shoppingCart.createEvent<{
  partId: number
  count: number
}>()

export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  partId: number
  total_price: number
}>()

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((cart) => cart.partId !== partId)

function updateCartItem<T>(
  cartItems: IShoppingCartItem[],
  partId: number,
  payload: T
) {
  return cartItems.map((item) =>
    item.partId === partId ? { ...item, ...payload } : item
  )
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCart, (state, partId) => [...remove(state, partId)])
  .on(updateCartItemTotalPrice, (state, { partId, total_price }) => [
    ...updateCartItem(state, partId, { total_price }),
  ])
  .on(updateCartItemCount, (state, { partId, count }) => [
    ...updateCartItem(state, partId, { count }),
  ])

// total price
export const setTotalPrice = shoppingCart.createEvent<number>()

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)
