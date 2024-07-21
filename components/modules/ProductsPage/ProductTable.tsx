import React from 'react'
import { IProduct, IProducts } from '@/types/products'
import { numberMetricFormat } from '@/utils/anbar'
import styles from '@/styles/products/index.module.scss'

const ProductTable = ({ products, operation, addProduct }: IProducts) => {
  const handleAddProduct = (product: IProduct) => {
    if (addProduct) {
      addProduct(product)
    }
  }

  if (products !== undefined) {
    if (products.length === 0) {
      return (
        <h1 style={{ textAlign: 'center' }}>Materialların siyahısı boşdur</h1>
      )
    } else {
      if (operation) {
        return (
          <div className={styles.table}>
            <div className={`${styles.tableRow} ${styles.tableRow__title}`}>
              <div className={`${styles.th} ${styles.numList}`}>{' №'}</div>
              <div className={`${styles.th} ${styles.small}`}>Azenco Code</div>
              <div className={`${styles.th} ${styles.max}`}>MATERIAL</div>
              <div className={`${styles.th} ${styles.small}`}>Ölçü vahidi</div>
              <div className={`${styles.th} ${styles.small}`}>Qiymət</div>
              <div className={`${styles.th} ${styles.numList}`}>ID</div>
              {operation && (
                <div className={`${styles.th} ${styles.table__button}`}>
                  Hərəkət
                </div>
              )}
            </div>
            {products.map((product: IProduct, index: number) => (
              <div key={product.id} className={styles.tableRow}>
                <div className={`${styles.td} ${styles.numList}`}>
                  {`${index + 1})`}
                </div>
                <div className={`${styles.td} ${styles.small}`}>
                  {product.azencoCode}
                </div>
                <div className={`${styles.td} ${styles.max}`}>
                  {product.name}
                </div>
                <div className={`${styles.td} ${styles.small}`}>
                  {product.unit}
                </div>
                <div className={`${styles.td} ${styles.small}`}>
                  {numberMetricFormat(product.price)}
                </div>
                <div className={`${styles.td} ${styles.numList}`}>
                  {product.id}
                </div>
                {operation && (
                  <div className={`${styles.td} ${styles.table__button}`}>
                    <button
                      className={styles.add__button}
                      onClick={() => handleAddProduct(product)}
                    >
                      əlavə edin
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }

      return (
        <div className={styles.table}>
          <div className={`${styles.tableRow} ${styles.tableRow__title}`}>
            <div className={`${styles.th} ${styles.numList}`}>{' №'}</div>
            <div className={`${styles.th} ${styles.small}`}>Azenco Code</div>
            <div className={`${styles.th} ${styles.max}`}>MATERIAL</div>
            <div className={`${styles.th} ${styles.small}`}>Ölçü vahidi</div>
            <div className={`${styles.th} ${styles.small}`}>Qiymət</div>
            <div className={`${styles.th} ${styles.numList}`}>ID</div>
          </div>
          {products.map((product: IProduct, index: number) => (
            <div key={product.id} className={styles.tableRow}>
              <div className={`${styles.td} ${styles.numList}`}>
                {`${index + 1})`}
              </div>
              <div className={`${styles.td} ${styles.small}`}>
                {product.azencoCode}
              </div>
              <div className={`${styles.td} ${styles.max}`}>{product.name}</div>
              <div className={`${styles.td} ${styles.small}`}>
                {product.unit}
              </div>
              <div className={`${styles.td} ${styles.small}`}>
                {numberMetricFormat(product.price)}
              </div>
              <div className={`${styles.td} ${styles.numList}`}>
                {product.id}
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}

export default ProductTable
