// pages/products/page.tsx

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getProductsFx, getSearchNameWordProductFx } from '@/app/api/products'
import { IProductsResponse } from '@/types/products'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import Pagination from '@/components/templates/Pagination/Pagination'
import SortButtons from '@/components/templates/SortButtons/SortButtons'
import PriceFilter from '@/components/modules/ProductsPage/PriceFilter'

import styles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'

const ProductsPage = () => {
  const router = useRouter()
  const limit = 20
  const adminCheck = true
  const query = new URLSearchParams(window.location.search)
  const initialOffset = Number(query.get('offset')) || 0
  const initialSortBy = query.get('sortBy') || 'asc'
  const initialpriceFrom = query.get('priceFrom') || '0'
  const initialpriceTo = query.get('priceTo')

  const [spinner, setSpinner] = useState(false)
  const [prices, setPrices] = useState(false)
  const [offset, setOffset] = useState(initialOffset)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [searchType, setSearchType] = useState('name')
  const [searchValue, setSearchValue] = useState('')
  const [priceFrom, setPriceFrom] = useState<string>(initialpriceFrom)
  const [priceTo, setPriceTo] = useState<string>(
    initialpriceTo ? initialpriceTo : '0'
  )
  const [resultSearch, setResultSearch] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })
  const [products, setProducts] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })
  const filterProducts = resultSearch.count ? resultSearch : products

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setSpinner(true)
        const data = await getProductsFx(
          `/products?limit=${limit}&offset=${prices ? 0 : offset}&sortBy=${sortBy}${
            prices ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
          }`
        )
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
  }, [prices, offset, router, sortBy, priceFrom, priceTo])

  useEffect(() => {
    const url = `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}
    ${prices ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''}`
    router.push(url)
  }, [prices, offset, router, sortBy, priceFrom, priceTo])

  const searchProduct = async () => {
    try {
      setSpinner(true)
      let data
      if (searchType === 'name') {
        data = await getSearchNameWordProductFx({ part_name: searchValue })
      } else {
        //data = await getSearchNameWordProductFx({ azencoCode: searchValue })
      }
      if (data?.error_message) {
        toast.warning(data?.error_message)
      }
      setResultSearch({ count: data.products?.length, rows: data.products })
    } catch (error) {
      alert(error)
    } finally {
      setSpinner(false)
    }
  }

  const clearSearch = () => {
    setOffset(0)
    setSearchValue('')
    setPriceFrom('0')
    setPriceTo('10000000')
    setResultSearch({ count: 0, rows: [] })
  }

  const handlePageChange = (page: number) => {
    setOffset(page - 1)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
  }

  const handlePriceFilter = (priceFrom: string, priceTo: string) => {
    setPrices(true)
    setPriceFrom(priceFrom)
    setPriceTo(priceTo)
  }

  const totalPages = Math.ceil(filterProducts.count / limit)

  if (spinner) {
    return (
      <div className={spinnerStyles.spinnerContainer}>
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
          onChange={(e) => setSearchType(e.target.value)}
          className={styles.searchSelect}
        >
          <option value="name">Поиск по имени продукта</option>
          <option value="code">Поиск по коду продукта</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Поиск по ${searchType === 'name' ? 'имени' : 'коду'} продукта`}
          className={styles.searchInput}
        />
        <PriceFilter onFilter={handlePriceFilter} />
        <button
          onClick={searchProduct}
          disabled={!searchValue && !priceFrom && !priceTo}
          className={styles.searchButton}
        >
          Поиск
        </button>
        <button onClick={clearSearch} className={styles.clearButton}>
          Стереть фильтр
        </button>
      </div>
      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />
      <ProductTable data={filterProducts} />
      {totalPages > 1 && (
        <Pagination
          currentPage={offset / limit}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <div className={styles.totalCount}>
        Cəmi: <b>{filterProducts.count}</b> material var
      </div>
    </div>
  )
}

export default ProductsPage
