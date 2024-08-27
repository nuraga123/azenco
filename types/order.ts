import { IBarnItem } from './barn'

export interface IOrderItem {
  id: number
  status: string
  clientId: number
  clientUserName: string
  clientMessage: string
  barnUsername: string
  barnUserId: number
  barnUserMessage: string
  barnId: number
  productName: string
  azencoCode: string
  newStock: string
  usedStock: string
  brokenStock: string
  totalStock: string
  lostNewStock: string
  lostUsedStock: string
  lostBrokenStock: string
  lostTotalStock: string
  price: string
  totalPrice: string
  unit: string
  barnLocation: string
  clientLocation: string
  driverName: string
  carNumber: string
  info: string
  productId: number
  createdAt: string
  updatedAt: string
}

export interface IOrdersSuccess {
  orders: IOrderItem[] | undefined
  error_message: string | undefined
}

export interface IOrdersError {
  orders?: undefined
  error_message: string
}

export type IOrdersResponse = IOrdersSuccess | IOrdersError

export interface IOrders {
  orders?: IOrderItem[]
  error_message?: string
}

export interface IOrderBase {
  newStock: string
  usedStock: string
  brokenStock: string
  clientMessage: string
  clientLocation: string
  handleNewStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUsedStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBrokenStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleCLientLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClientMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled: boolean
  spinner: boolean
  errorsMessageArr: string[]
}

export interface IOrderModal extends IOrderBase {
  currentBarn: IBarnItem
  toggleModal: boolean
  closeBtn: () => void
  barnUsername?: string
}
