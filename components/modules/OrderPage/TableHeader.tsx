import React from 'react'
import styles from '@/styles/order/index.module.scss'

const TableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className={styles.tableHeader}>status</th>
      <th className={styles.tableHeader}>status</th>
      <th className={styles.tableHeader}>Məhsulun Adı</th>
      <th className={styles.tableHeader}>Ümumi Qiymət</th>
      <th className={styles.tableHeader}>Məlumat</th>
    </tr>
  </thead>
)

export default TableHeader
