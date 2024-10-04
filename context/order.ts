import { IOrdersResponce } from '@/types/order'
import { createDomain } from 'effector-next'

const order = createDomain()

export const $setOrder = order.createEvent<IOrdersResponce>()

export const $order = order
  .createStore<IOrdersResponce>({} as IOrdersResponce)
  .on($setOrder, (_, order) => order)
