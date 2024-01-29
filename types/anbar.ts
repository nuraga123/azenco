export interface AnbarProduct {
  userId: number
  productId: number
  name: string
  type: string
  price: number
  unit: string
  azenco__code: string
  images: string
  createdAt: string
  updatedAt: string
}

export interface AnbarProductProps {
  createdAt: string
  id: number
  img: string
  name: string
  ordered: boolean
  previous_stock: string
  previous_total_price: string
  price: string
  productId: number
  stock: string
  total_price: string
  type: string
  unit: string
  updatedAt: string
  userId: number
  username: string
}

export interface AnbarUser {
  id: number
  username: string
  anbar: AnbarProduct[]
}

export interface Anbars {
  AnbarUsers: AnbarUser[]
}
