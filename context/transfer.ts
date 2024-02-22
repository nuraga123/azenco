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
      id: 0,
      userId: 0,
      azenco__code: '',
      name: '',
      img: '',
      ordered: false,
      previous_stock: '',
      previous_total_price: '',
      productId: 0,
      total_price: '',
      type: '',
      unit: '',
      username: '',
      updatedAt: '',
      createdAt: '',
    },
  })
  .on(setTransfer, (_, transfer) => transfer)
