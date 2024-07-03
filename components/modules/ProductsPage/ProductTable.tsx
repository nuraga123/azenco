import React from 'react'
import { IProduct, IProductsResponse } from '@/types/products'
import styles from '@/styles/products/index.module.scss'
import ProductImg from './ProductImg'
import { formatDateTime } from '@/utils/formatDateTime'
import { numberMetricFormat } from '@/utils/anbar'

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
            <th className={styles.th}>{' №'}</th>
            <th className={styles.th}>Azenco Code</th>
            <th className={styles.th}>MATERIAL</th>
            <th className={styles.th}>Növ</th>
            <th className={styles.th}>Ölçü vahidi</th>
            <th className={styles.th}>Qiymət</th>
            <th className={styles.th}>Şəkil</th>
            <th className={styles.th}>Yaradıldı</th>
            <th className={styles.th}>Yenilənib</th>
            <th className={styles.th}>ID</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct, index: number) => (
            <tr key={product.id} className={styles.tr}>
              <td className={styles.td}>{`${index + 1})`}</td>
              <td className={styles.td}>{product.azencoCode}</td>
              <td className={styles.td}>{product.name}</td>
              <td className={styles.td}>{product.type}</td>
              <td className={styles.td}>{product.unit}</td>
              <td className={styles.td}>{numberMetricFormat(product.price)}</td>
              <td className={styles.td}>
                <ProductImg data={products} id={product.id} />
              </td>
              <td className={styles.td}>{formatDateTime(product.createdAt)}</td>
              <td className={styles.td}>{formatDateTime(product.updatedAt)}</td>
              <td className={styles.td}>{product.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
