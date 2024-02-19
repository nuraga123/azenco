import { createDomain } from 'effector-next'
import { IOrderTransfer } from '@/types/anbar'

const transfer = createDomain()

export const setTransfer = transfer.createEvent<IOrderTransfer>()

export const $transfer = transfer
  .createStore<IOrderTransfer>({
    fromUserId: 0,
    fromUsername: '',
    toUserId: 0,
    toUsername: '',
    product: {
      price: '',
      stock: '',
    },
  })
  .on(setTransfer, (_, transfer) => transfer)
