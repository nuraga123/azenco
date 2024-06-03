import { IProduct } from '@/types/products'
import { createDomain } from 'effector-next'

const products = createDomain()

export const $setProducts = products.createEvent<IProduct[]>()

export const $products = products
  .createStore<IProduct[]>([])
  .on($setProducts, (_, product) => product)
