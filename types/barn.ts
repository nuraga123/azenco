export interface IBarnItem {
  id: number
  userId: number
  productId: number
  username: string
  productName: string
  azencoCode: string
  type: string
  unit: string
  img: string
  location: string
  newStock: string
  usedStock: string
  brokenStock: string
  totalStock: string
  price: string
  newTotalPrice: string
  usedTotalPrice: string
  brokenTotalPrice: string
  totalPrice: string
  lostNewStock: string
  lostUsedStock: string
  lostBrokenStock: string
  lostTotalStock: string
  lostNewTotalPrice: string
  lostUsedTotalPrice: string
  lostBrokenTotalPrice: string
  lostTotalPrice: string
  createdAt: string
  updatedAt: string
}

// Интерфейс для ответа сервера
export interface IBarnResponse {
  barns: IBarnItem[]
  message: string
  error_message: string
}

export interface IStocksBarn {
  barnId: number
  movementType: string
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  newStock: number
  usedStock: number
  brokenStock: number
}

export interface IStocksLostBarn {
  barnId: number
  movementType: string
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  lostNewStock: number
  lostUsedStock: number
  lostBrokenStock: number
}
