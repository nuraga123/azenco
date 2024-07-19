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
  operation?: boolean
  addProduct?: (product: IProduct) => void
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

export interface ISearchProducts {
  searchType: 'code' | 'name'
  searchValue: string
  priceFrom: string
  priceTo: string
  setSearchType: (value: React.SetStateAction<'name' | 'code'>) => void
  setSearchValue: (value: React.SetStateAction<string>) => void
  setPriceFrom: (value: React.SetStateAction<string>) => void
  setPriceTo: (value: React.SetStateAction<string>) => void
  searchProduct: () => Promise<void>
  clearSearch: () => void
}
