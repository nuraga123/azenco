import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getProductsFx } from '@/app/api/products'
import { IProductsResponse } from '@/types/products'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import Pagination from '@/components/templates/Pagination/Pagination'
import SortButtons from '@/components/templates/SortButtons/SortButtons'
import { getLocalStorageUser } from '@/localStorageUser'

import styles from '@/styles/products/index.module.scss'

const ProductsPage = () => {
  const router = useRouter()
  const limit: number = 20
  const { usernameStorage } = getLocalStorageUser()
  const adminCheck = usernameStorage === `${process.env.NEXT_PUBLIC_ADMIN_NAME}`
  console.log(`admin check = ${adminCheck}`)

  const query = new URLSearchParams(window.location.search)
  const initialOffset = Number(query.get('offset')) || 0
  const initialSortBy = query.get('sortBy') || 'asc'

  const [offset, setOffset] = useState<number>(initialOffset)
  const [sortBy, setSortBy] = useState<string>(initialSortBy)
  const [products, setProducts] = useState<IProductsResponse>({
    count: 0,
    rows: [],
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
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
      }
    }

    loadProducts()
  }, [offset, sortBy])

  useEffect(() => {
    const url = `/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}`
    router.push(url)
  }, [offset, router, sortBy])

  const totalPages = Math.ceil(products.count / limit)
  const currentPage = Math.floor(offset / limit)

  const handlePageChange = (page: number) => {
    setOffset(page)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
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

      <ProductTable data={products} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <SortButtons currentSortBy={sortBy} onSortChange={handleSortChange} />
    </div>
  )
}

export default ProductsPage
