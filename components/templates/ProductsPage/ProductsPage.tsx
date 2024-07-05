/* eslint-disable max-len */
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getProductsFx } from '@/app/api/products'
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
  //const initialPriceFrom = query.get('priceFrom') || '0'
  //const initialPriceTo = query.get('priceTo') || '100000000000000'

  const [spinner, setSpinner] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(initialOffset)
  const [sortBy, setSortBy] = useState<string>(initialSortBy)
  //const [price, setPrice] = useState([initialPriceFrom, initialPriceTo])
  //console.log(setPrice([]))

  const [products, setProducts] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setSpinner(true)
        const data: IProductsResponse = await getProductsFx(
          `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}`
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
  }, [offset, sortBy])

  useEffect(() => {
    const url = `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}`
    router.push(url)
  }, [offset, router, sortBy])

  const totalPages = Math.ceil(products.count / limit)
  const currentPage = offset + 1 // Convert to 1-based for display

  const handlePageChange = (page: number) => {
    setOffset(page - 1) // Convert to 0-based for offset
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
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
        <input type="text" />
        <button>поиск</button>
      </div>
      <div>
        от
        <input type="text" onChange={() => console.log()} />
        до
        <input type="text" />
      </div>
      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />
      <ProductTable data={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      Cəmi: <b>{products.count}</b> material var
    </div>
  )
}

export default ProductsPage
