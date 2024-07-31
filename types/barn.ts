export interface IBarnItem {
  //видно на таблице
  id: number
  azencoCode: string
  productName: string
  unit: string
  price: string
  newStock: string
  usedStock: string
  brokenStock: string
  totalStock: string
  newTotalPrice: string
  usedTotalPrice: string
  brokenTotalPrice: string
  totalPrice: string
  location: string
  createdAt: string
  updatedAt: string
  username: string
  // потерянное
  lostNewStock: string
  lostUsedStock: string
  lostBrokenStock: string
  lostTotalStock: string
  lostNewTotalPrice: string
  lostUsedTotalPrice: string
  lostBrokenTotalPrice: string
  lostTotalPrice: string
  // не видно
  userId: number
  productId: number
  type: string
  img: string
}

// Интерфейс для ответа сервера
export interface IBarnResponse {
  barns: IBarnItem[]
  message: string
  error_message: string
}

export interface IStocksBarn {
  barnId: number
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  newStock: number
  usedStock: number
  brokenStock: number
}

export interface IStocksLostBarn {
  barnId: number
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  lostNewStock: number
  lostUsedStock: number
  lostBrokenStock: number
}

export interface MaterialProps {
  productName: string
  type: string
  unit: string
  img: string
  newStock: string
  usedStock: string
  brokenStock: string
  price: string
  totalPrice: string
  createdAt: string
  updatedAt: string
  location: string
  username: string
}

export interface IBarnFormData {
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  newStock: string
  usedStock: string
  brokenStock: string
  movementType: string
}
