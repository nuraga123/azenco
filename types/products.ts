export interface IProduct {
  id: number
  name: string
  type: string
  price: string
  unit: string
  azencoCode: string
  img: string
  createdAt: string
  updatedAt: string
}

export interface IProductsResponse {
  count: number
  rows: IProduct[]
}

export interface IGetSearchNameWordProduct {
  part_name: string
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
