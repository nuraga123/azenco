import React, { useState } from 'react'

import styles from '@/styles/anbar/add_form.module.scss'
import { useStore } from 'effector-react'
import { $products } from '@/context/barns'
import Spinner from '@/components/modules/Spinner/Spinner'
import ProductCard from '@/components/modules/BarnsPage/ProductsCard'
import { IProduct } from '@/types/products'

const ProductsList = ({ error }: { error: string }) => {
  const [spinner, setSpinner] = useState<boolean>(false)

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [selectedProduct, setSelectedProduct] = useState<IProduct>({
    id: 0,
    name: '',
    type: '',
    price: '',
    unit: '',
    azencoСode: '',
    img: '',
    createdAt: '',
    updatedAt: '',
  })

  const searchProducts = useStore($products)
  return (
    <div>
      {spinner ? (
        <Spinner />
      ) : (
        <div className={styles.product_list}>
          {searchProducts?.length ? (
            searchProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={(product) => {
                  setSelectedProduct(product)
                  setModalOpen(true)
                }}
              />
            ))
          ) : (
            <span className={styles.error}>{error}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsList
