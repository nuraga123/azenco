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

export interface AnbarUser {
  id: number
  username: string
  anbar: AnbarProduct[]
}

export interface Anbars {
  AnbarUsers: AnbarUser[]
}
