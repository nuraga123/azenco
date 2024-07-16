import React from 'react'
import { numberMetricFormat } from '@/utils/anbar'
import { IProduct } from '@/types/products'
import styles from '@/styles/products/product-card.module.scss'

interface ProductCardProps {
  product: IProduct
  onClick: (product: IProduct) => void
}

export const ProductCardKey: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => (
  <div className={styles.productCard}>
    <div className={styles.table__title}>
      <p className={styles.value}>{product.azencoCode}</p>
      <p className={styles.value}>{product.name}</p>
      <p className={styles.value}>{product.unit}</p>
      <p className={styles.value}>{numberMetricFormat(product.price)} m.</p>
      <p className={styles.value}>
        <button className={styles.button} onClick={() => onClick(product)}>
          əlavə edin
        </button>
      </p>
    </div>
  </div>
)

export const ProductCardValue: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => (
  <div className={styles.productCard}>
    <div className={styles.table__title}>
      <p className={styles.value}>{product.azencoCode}</p>
      <p className={styles.value}>{product.name}</p>
      <p className={styles.value}>{product.unit}</p>
      <p className={styles.value}>{numberMetricFormat(product.price)} m.</p>
      <p className={styles.value}>
        <button className={styles.button} onClick={() => onClick(product)}>
          əlavə edin
        </button>
      </p>
    </div>
  </div>
)
