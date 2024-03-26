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

export interface IGetSearchNameWordProduct {
  search_word: string
}

export interface DataNewProduct {
  azenco__code: string
  name: string
  type: string
  unit: string
  price: string
  images: string
}

export interface addProductFxProps {
  url: string
  new__product: DataNewProduct
}
