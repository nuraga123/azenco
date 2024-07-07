/* eslint-disable max-len */
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getProductsFx, getSearchNameWordProductFx } from '@/app/api/products'
import { IProductsResponse } from '@/types/products'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import Pagination from '@/components/templates/Pagination/Pagination'
import SortButtons from '@/components/templates/SortButtons/SortButtons'
//import { getLocalStorageUser } from '@/localStorageUser'

import styles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const ProductsPage = () => {
  const router = useRouter()
  const limit: number = 20
  //const { usernameStorage } = getLocalStorageUser()
  //usernameStorage === `${process.env.NEXT_PUBLIC_ADMIN_NAME}`
  const adminCheck = true
  console.log(`admin check = ${adminCheck}`)

  const query = new URLSearchParams(window.location.search)
  const initialOffset = Number(query.get('offset')) || 0
  const initialSortBy = query.get('sortBy') || 'asc'
  const initialPriceFrom = query.get('priceFrom') || '0'
  const initialPriceTo = query.get('priceTo') || '0'

  const [spinner, setSpinner] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(initialOffset)
  const [sortBy, setSortBy] = useState<string>(initialSortBy)
  const [search, setSearch] = useState<string>('')
  const [resultSearch, setResultSearch] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })
  const [priceFrom, setPriceFrom] = useState(initialPriceFrom)
  const [priceTo, setPriceTo] = useState(initialPriceTo)

  const [products, setProducts] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })

  const filterProducts = resultSearch.count ? resultSearch : products

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setSpinner(true)
        const data: IProductsResponse = await getProductsFx(
          `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortBy=asc&priceFrom=1&priceTo=2`
        )

        if (data?.rows) {
          setProducts(data)
        } else {
          console.log('Failed to fetch data')
        }
      } catch (error) {
        console.log('Error:', error)
        setSpinner(false)
      } finally {
        setSpinner(false)
      }
    }

    loadProducts()
  }, [offset, priceFrom, priceTo, router, sortBy])

  useEffect(() => {
    const url = `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}`
    router.push(url)
  }, [offset, router, sortBy])

  const searchProductPartName = async () => {
    try {
      setSpinner(true)
      const data = await getSearchNameWordProductFx({
        part_name: search,
      })

      setResultSearch({
        count: data.products.length,
        rows: data.products,
      })
    } catch (error) {
      alert(error)
    } finally {
      setSpinner(false)
    }
  }

  const searchPrices = () => {
    console.log(priceFrom, priceTo)
  }

  const totalPages = Math.ceil(products.count / limit)
  const currentPage = offset + 1 // Convert to 1-based for display

  const handlePageChange = (page: number) => {
    setOffset(page - 1) // Convert to 0-based for offset
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
  }

  const handleSearchPartName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (spinner) {
    return (
      <div>
        <div
          style={{ margin: '100px auto' }}
          className={spinnerStyles.spinner}
        />
      </div>
    )
  }

  return (
    <div>
      <div className={styles.products__header}>
        <h1 className={styles.title}>Materiallar</h1>
        {adminCheck && (
          <Link href={'/products/add-form'} legacyBehavior passHref>
            <button className={styles.add__button}>Yeni Material Yarat</button>
          </Link>
        )}
      </div>
      <div>
        <input type="text" value={search} onChange={handleSearchPartName} />
        <button onClick={searchProductPartName}>поиск</button>
      </div>
      <div>
        от
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault()
            setPriceFrom(e.target.value)
          }}
        />
        до
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault()
            setPriceTo(e.target.value)
          }}
        />
      </div>
      <button onClick={searchPrices}>поиск по цене</button>
      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />
      <ProductTable data={filterProducts} />
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      Cəmi: <b>{products.count}</b> material var
    </div>
  )
}

export default ProductsPage
