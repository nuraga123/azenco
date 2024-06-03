/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { numberMetricFormat } from '@/utils/anbar'
import { IProduct } from '@/types/products'
import styles from '@/styles/products/product-card.module.scss'

interface ProductCardProps {
  product: IProduct
  onClick: (product: IProduct) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  console.log()

  return (
    <div className={styles.product_card}>
      <div style={{ borderBottom: '1px solid black' }}>
        <img
          src={product.img}
          alt={product.name}
          className={styles.product_image}
        />
      </div>
      <div className={styles.product_info}>
        <h3 className={styles.product_name}>{product.name}</h3>
        <p className={styles.product_name}>kod: {product.azencoСode}</p>
        <p className={styles.product_type}>növü: {product.type}</p>
        <p className={styles.product_unit}>Ölçü vahidi: {product.unit}</p>
        <h4 className={styles.product_price}>
          Qiymət: {numberMetricFormat(product.price)} m.
        </h4>
      </div>
      <button className={styles.button} onClick={() => onClick(product)}>
        əlavə edin
      </button>
    </div>
  )
}

export default ProductCard
