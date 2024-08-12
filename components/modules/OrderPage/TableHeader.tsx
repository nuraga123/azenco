import React from 'react'
import styles from '@/styles/order/index.module.scss'

const TableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className={styles.tableHeader}>Azenco Kodu</th>
      <th className={styles.tableHeader}>Məhsulun Adı</th>
      <th className={styles.tableHeader}>Yeni</th>
      <th className={styles.tableHeader}>İşlənmiş</th>
      <th className={styles.tableHeader}>Yararsız</th>
      <th className={styles.tableHeader}>Qiymət</th>
      <th className={styles.tableHeader}>Ümumi Qiymət</th>
      <th className={styles.tableHeader}>Vahid</th>
      <th className={styles.tableHeader}>Məlumat</th>
    </tr>
  </thead>
)

export default TableHeader
