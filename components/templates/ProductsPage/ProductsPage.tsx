import { useEffect, useState } from 'react'
import { getProductsFx } from '@/app/api/products'
import { ProductsResponse } from '@/types/products'
import ProductTable from '@/components/modules/ProductsPage/ProductTable'
import styles from '@/styles/products/index.module.scss'

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductsResponse>({
    count: 0,
    rows: [],
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data: ProductsResponse = await getProductsFx(
        '/products?limit=20&offset=0&sortBy=asc'
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

  return (
    <div>
      <h1 className={styles.title}>Materiallar</h1>

      <ProductTable data={products} />
    </div>
  )
}

export default ProductsPage
