import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { IProducts, IProduct } from '@/types/products'
import { postSearchNameAndAzencoCodeFiltersPorudctsFx } from '@/app/api/products'
import SearchProductsComponent from '@/components/modules/ProductsPage/SearchProductsComponent'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import BarnModal from '@/components/modules/BarnsPage/Modal'
import SortButtons from '@/components/templates/SortButtons/SortButtons'
import BackBtn from '@/components/elements/btn/BackBtn'

import productsStyles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CreateFormBarn = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [searchType, setSearchType] = useState<'name' | 'code'>('name')
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc')
  const [priceFrom, setPriceFrom] = useState<string>('')
  const [priceTo, setPriceTo] = useState<string>('')

  const [resultSearch, setResultSearch] = useState<IProducts>({ products: [] })
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  const searchProduct = async () => {
    try {
      setSpinner(true)
      const searchData = await postSearchNameAndAzencoCodeFiltersPorudctsFx({
        type: searchType,
        sortBy,
        searchValue,
        priceFrom,
        priceTo,
      })

      if (searchData?.error_message) {
        toast.warning(searchData?.error_message)
      }

      setResultSearch(searchData)
      console.log(searchData)
    } catch (error) {
      alert(error)
    } finally {
      setSpinner(false)
    }
  }

  const clearSearch = () => {
    setSearchValue('')
    setPriceFrom('')
    setPriceTo('')
    setResultSearch({ products: [] })
  }

  const handleSortChange = (newSortBy: 'asc' | 'desc') => {
    setSortBy(newSortBy)
  }

  const countProducts: string = `${
    resultSearch?.products?.length === 0 ||
    resultSearch?.products?.length === undefined
      ? ''
      : resultSearch?.products?.length
  }`

  const handleAddProductClick = (product: IProduct) => {
    setSelectedProduct(product)
    setIsOpen(true)
  }

  return (
    <div className={productsStyles.container}>
      <BackBtn />
      <SearchProductsComponent
        searchType={searchType}
        searchValue={searchValue}
        priceFrom={priceFrom}
        priceTo={priceTo}
        setSearchType={setSearchType}
        setSearchValue={setSearchValue}
        setPriceFrom={setPriceFrom}
        setPriceTo={setPriceTo}
        searchProduct={searchProduct}
        clearSearch={clearSearch}
      />

      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />

      {spinner ? (
        <div className={spinnerStyles.container}>
          <h1>yüklənir</h1>
          <div className={spinnerStyles.spinner} />
        </div>
      ) : (
        countProducts && (
          <div className={productsStyles.barn__result__container}>
            <div className={productsStyles.totalCount}>
              Cəmi: <b>{countProducts}</b> material tapildi
            </div>

            <br />

            <ProductTable
              products={resultSearch.products}
              operation={true}
              addProduct={handleAddProductClick}
            />
          </div>
        )
      )}

      <BarnModal
        isOpen={isOpen}
        product={selectedProduct}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export default CreateFormBarn
