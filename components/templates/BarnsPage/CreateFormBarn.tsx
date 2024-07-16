import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { IProducts, IProduct } from '@/types/products'
import SortButtons from '../SortButtons/SortButtons'
import { postSearchNameAndAzencoCodeFiltersPorudctsFx } from '@/app/api/products'
import BarnModal from '@/components/modules/BarnsPage/Modal'
import productsStyles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'

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
      <div className={productsStyles.searchContainer}>
        <select
          value={searchType}
          className={productsStyles.searchSelect}
          onChange={(e) =>
            setSearchType(e.target.value === 'name' ? 'name' : 'code')
          }
        >
          <option value="name">Məhsul adına görə axtarın</option>
          <option value="code">Məhsul Azenco kodu ilə axtarın</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Məhsul ${
            searchType === 'name' ? 'adı' : 'kodu'
          } ilə axtarın`}
          className={productsStyles.searchInput}
        />
        <>
          <div className={productsStyles.priceFilterContainer}>
            <input
              type="text"
              value={priceFrom}
              onChange={(e) => {
                e.preventDefault()
                setPriceFrom(e.target.value)
              }}
              placeholder="min. qiymət"
              className={productsStyles.priceInput}
            />
            <input
              type="text"
              value={priceTo}
              onChange={(e) => {
                e.preventDefault()
                setPriceTo(e.target.value)
              }}
              placeholder="max. qiymət"
              className={productsStyles.priceInput}
            />
          </div>
        </>

        <button
          onClick={searchProduct}
          disabled={!searchValue && !priceFrom && !priceTo}
          className={productsStyles.searchButton}
        >
          Axtar
        </button>

        <button onClick={clearSearch} className={productsStyles.clearButton}>
          Filtri silin
        </button>
      </div>

      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />
      <br />

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
        isOpen={true}
        product={selectedProduct}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export default CreateFormBarn
