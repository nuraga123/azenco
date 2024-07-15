import React from 'react'
import { numberMetricFormat } from '@/utils/anbar'
import { IProduct } from '@/types/products'
import styles from '@/styles/products/product-card.module.scss'

interface ProductCardProps {
  product: IProduct
  onClick: (product: IProduct) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => (
  <div className={styles.product_card}>
    <div className={styles.product_info}>
      <p className={styles.product_name}>Azenco kod: {product.azencoCode}</p>
      <h3 className={styles.product_name}>Material adı: {product.name}</h3>
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

export default ProductCard
