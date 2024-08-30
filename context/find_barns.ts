import { IFindBarnsOfProductData } from '@/types/barn'
import { createDomain } from 'effector-next'

const find_barns = createDomain()

export const $setFind_barns = find_barns.createEvent<IFindBarnsOfProductData>()

export const $find_barns = find_barns
  .createStore<IFindBarnsOfProductData>({
    productId: 0,
    azencoCode: '',
    productName: '',
    deleteName: '',
  })
  .on($setFind_barns, (_, find) => find)
