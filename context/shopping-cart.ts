import { createDomain } from 'effector-next'
import { IShoppingCartItem } from '@/types/shopping-cart'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCart = shoppingCart.createEvent<number>()

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((cart) => cart.partId !== partId)

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCart, (state, partId) => [...remove(state, partId)])
