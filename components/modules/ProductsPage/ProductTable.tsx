import React from 'react'
import { IProduct, IProductsResponse } from '@/types/products'
import { numberMetricFormat } from '@/utils/anbar'
import styles from '@/styles/products/index.module.scss'

const ProductTable = ({ data }: { data: IProductsResponse }) => {
  const products = data.rows.length ? data.rows : []

  if (products.length === 0) {
    return (
      <h1 style={{ textAlign: 'center' }}>Materialların siyahısı boşdur</h1>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* Заголовки столбцов таблицы */}
            <th className={`${styles.th} ${styles.numList}`}>{' №'}</th>
            <th className={`${styles.th} ${styles.small}`}>Azenco Code</th>
            <th className={`${styles.th} ${styles.max}`}>MATERIAL</th>
            <th className={`${styles.th} ${styles.small}`}>Ölçü vahidi</th>
            <th className={`${styles.th} ${styles.small}`}>Qiymət</th>
            <th className={styles.th}>ID</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct, index: number) => (
            <tr key={product.id} className={styles.tr}>
              <td
                className={`${styles.td} ${styles.numList}`}
              >{`${index + 1})`}</td>
              <td className={`${styles.td} ${styles.small}`}>
                {product.azencoCode}
              </td>
              <td className={`${styles.td} ${styles.max}`}>{product.name}</td>
              <td className={`${styles.td} ${styles.small}`}>{product.unit}</td>
              <td className={`${styles.td} ${styles.small}`}>
                {numberMetricFormat(product.price)}
              </td>
              <td className={styles.td}>{product.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
