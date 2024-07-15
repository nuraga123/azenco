/* eslint-disable max-len */
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

import {
  getProductsFx,
  postSearchNameAndAzencoCodeFiltersPorudctsFx,
} from '@/app/api/products'
import { IProducts, IProductsResponse } from '@/types/products'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import Pagination from '@/components/templates/Pagination/Pagination'
import SortButtons from '@/components/templates/SortButtons/SortButtons'

import styles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const ProductsPage = () => {
  const router = useRouter()
  const limit = 20
  const adminCheck = true
  const query = new URLSearchParams(window.location.search)
  const initialOffset = Number(query.get('offset')) || 0
  const initialSortBy = query.get('sortBy') === 'asc' ? 'asc' : 'desc'
  const initialpriceFrom = query.get('priceFrom') || ''
  const initialpriceTo = query.get('priceTo') || ''

  const [spinner, setSpinner] = useState(false)
  const [offset, setOffset] = useState(initialOffset)
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>(initialSortBy)
  const [searchType, setSearchType] = useState<'name' | 'code'>('name')
  const [searchValue, setSearchValue] = useState('')
  const [priceFrom, setPriceFrom] = useState<string>(initialpriceFrom)
  const [priceTo, setPriceTo] = useState<string>(initialpriceTo)

  const [resultSearch, setResultSearch] = useState<IProducts>({ products: [] })

  const [products, setProducts] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setSpinner(true)
        const data = await getProductsFx({
          limit,
          offset,
          sortBy,
        })

        if (data?.rows) {
          setProducts(data)
        } else {
          console.log('Failed to fetch data')
        }
      } catch (error) {
        console.log('Error:', error)
      } finally {
        setSpinner(false)
      }
    }

    loadProducts()
  }, [offset, sortBy])

  useEffect(() => {
    const url = `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}`
    router.push(url)
  }, [offset, router, sortBy])

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
    setOffset(0)
    setSearchValue('')
    setPriceFrom('')
    setPriceTo('')
    setResultSearch({ products: [] })
  }

  const handlePageChange = (page: number | string) => {
    setOffset(+page - 1) // изменено для корректного отображения
  }

  const handleSortChange = (newSortBy: 'asc' | 'desc') => {
    setSortBy(newSortBy)
  }

  const totalPages = Math.ceil(products.count / limit)

  if (spinner) {
    return (
      <div className={spinnerStyles.container}>
        <h1>yüklənir</h1>
        <div className={spinnerStyles.spinner} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.productsHeader}>
        <h1 className={styles.title}>Materiallar</h1>
        {adminCheck && (
          <Link href={'/products/add-form'} legacyBehavior passHref>
            <button className={styles.addButton}>Yeni Material Yarat</button>
          </Link>
        )}
      </div>
      <div className={styles.searchContainer}>
        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(e.target.value === 'name' ? 'name' : 'code')
          }
          className={styles.searchSelect}
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
          className={styles.searchInput}
        />
        <>
          <div className={styles.priceFilterContainer}>
            <input
              type="text"
              value={priceFrom}
              onChange={(e) => {
                e.preventDefault()
                setPriceFrom(e.target.value)
              }}
              placeholder="min. qiymət"
              className={styles.priceInput}
            />
            <input
              type="text"
              value={priceTo}
              onChange={(e) => {
                e.preventDefault()
                setPriceTo(e.target.value)
              }}
              placeholder="max. qiymət"
              className={styles.priceInput}
            />
          </div>
        </>
        <button
          onClick={searchProduct}
          disabled={!searchValue && !priceFrom && !priceTo}
          className={styles.searchButton}
        >
          Axtar
        </button>

        <button onClick={clearSearch} className={styles.clearButton}>
          Filtri silin
        </button>
      </div>
      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />
      <br />
      {resultSearch?.products?.length ? (
        <>
          <ProductTable products={resultSearch.products} />
          <div className={styles.totalCount}>
            Cəmi: <b>{resultSearch?.products?.length}</b> material var
          </div>
        </>
      ) : (
        <>
          <ProductTable products={products.rows} />
          {totalPages > 1 && (
            <Pagination
              currentPage={offset + 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          <div className={styles.totalCount}>
            Cəmi: <b>{products?.count}</b> material var
          </div>
        </>
      )}
    </div>
  )
}

export default ProductsPage
