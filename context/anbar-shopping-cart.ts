import { createDomain } from 'effector-next'

const anbarShoppingCart = createDomain()

export const setAnbarShoppingCart = anbarShoppingCart.createEvent<[]>()

export const $anbarShoppingCart = anbarShoppingCart
  .createStore<[]>([])
  .on(setAnbarShoppingCart, (_, anbarCartProduct) => anbarCartProduct)
