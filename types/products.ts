export interface Product {
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

export interface ProductsResponse {
  count: number
  rows: Product[]
}
