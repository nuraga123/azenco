import React from 'react'
import styles from '@/styles/barn/table/index.module.scss'

const BarnTableHead = () => {
  console.log()

  return (
    <thead>
      <tr>
        <th className={styles.title__main} colSpan={3} rowSpan={2}>
          Əməliyyatlar
        </th>

        <th className={styles.title__main} colSpan={5}>
          Material haqqında
        </th>

        <th className={styles.title__main} colSpan={4}>
          Materialın miqdarı
        </th>

        <th className={styles.title__main} colSpan={4}>
          Malların məbləğı
        </th>

        <th className={styles.title__main} colSpan={5}>
          Əlavə material məlumatları
        </th>
      </tr>
      <tr>
        {/* Əsas */}
        <th className={styles.title}>ID</th>
        <th className={styles.title}>Azenco Kodu</th>
        <th className={styles.title}>Materialın Adı</th>
        <th className={styles.title}>Vahid</th>
        <th className={styles.title}>Qiymət</th>

        {/* Əsas miqdar */}
        <th className={styles.title}>Yeni</th>
        <th className={styles.title}>İşlənmiş</th>
        <th className={styles.title}>Yararsız</th>
        <th className={styles.title}>Ümumi</th>

        {/* Əsas məbləğ */}
        <th className={styles.title}>Yeni</th>
        <th className={styles.title}>İşlənmiş</th>
        <th className={styles.title}>Yararsız</th>
        <th className={styles.title}>Ümumi</th>

        {/* Əlavə */}
        <th className={styles.title}>Yer</th>
        <th className={styles.title}>Yaradılma tarixi</th>
        <th className={styles.title}>Yenilənib</th>
      </tr>
    </thead>
  )
}

export default BarnTableHead
