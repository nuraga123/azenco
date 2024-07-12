export interface IProduct {
  id: number
  name: string
  type: string
  price: number
  unit: string
  azencoCode: string
  img: string
  createdAt: string
  updatedAt: string
}

export interface IProducts {
  products: IProduct[]
}

export interface IProductsResponse {
  count: number
  rows: IProduct[]
}

export interface IGetSearchNameWordProduct {
  part_name: string
}

export interface DataNewProduct {
  azencoCode: string
  name: string
  type: string
  unit: string
  price: number
  images: string
}

export interface addProductFxProps {
  url: string
  new__product: DataNewProduct
}
