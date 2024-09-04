import React from 'react'
import styles from '@/styles/order/my/index.module.scss'

const OrderTableHeader = () => (
  <thead>
    <tr>
      <th rowSpan={2}>действия</th>
      <th rowSpan={2}>№</th>
      <th rowSpan={2}>Sifariş Nömrəsi</th>
      <th rowSpan={2}>Sifarişin Statusu</th>
      <th rowSpan={2}>Müştəri</th>
      <th rowSpan={2}>Müştərinin Yerləşdiyi Yer</th>
      <th rowSpan={2} className={styles.productName}>
        Material Adı
      </th>
      <th rowSpan={2}>Azenco Kodu</th>

      {/* Birleşmiş başlıq */}
      <th colSpan={4}>Material Miqdarı</th>

      <th rowSpan={2}>Ölçü Vahidi</th>
      <th rowSpan={2}>Qiymət (AZN)</th>
      <th rowSpan={2}>Cəmi Qiymət</th>
      <th rowSpan={2}>Yaradılıb</th>
    </tr>
    <tr>
      {/* Material miqdarı üçün alt başlıqlar */}
      <th>Yeni </th>
      <th>İşlənmiş</th>
      <th>Yararsız</th>
      <th>Ümumi</th>
    </tr>
  </thead>
)

export default OrderTableHeader
