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
