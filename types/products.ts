export interface IProduct {
  id: number
  name: string
  type: string
  price: string
  unit: string
  azenco__code: string
  images: string
  createdAt: string
  updatedAt: string
}

export interface IProductsResponse {
  count: number
  rows: IProduct[]
}

export interface addProductFxProps {
  url: string
  new__product: {
    name: string
    type: string
    price: string
    unit: string
    azenco__code: string
    images: string
  }
}
