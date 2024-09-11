import React from 'react'
import styles from '@/styles/order/my/index.module.scss'

const OrderTableHeader = ({ type }: { type: 'clientUser' | 'barnUser' }) => (
  <thead>
    <tr>
      <th rowSpan={2}>Əməliyyatlar</th>
      <th rowSpan={2}>№</th>
      <th colSpan={2}>Sifariş</th>

      <th colSpan={3} className={styles.no_wrap}>
        {type === 'clientUser' ? 'Anbardarın' : 'Müştərinin'}
      </th>

      <th rowSpan={2} className={styles.no_wrap}>
        Material Adı
      </th>

      <th rowSpan={2}>Azenco Kodu</th>

      <th colSpan={4}>Material Miqdarı</th>

      <th rowSpan={2}>Ölçü Vahidi</th>

      <th rowSpan={2}>Qiymət (AZN)</th>

      <th rowSpan={2}>Cəmi Qiymət (AZN)</th>

      <th rowSpan={2}>son tarix</th>

      <th colSpan={3}>{type === 'clientUser' ? 'Müştərinin' : 'Anbardarın'}</th>
    </tr>
    <tr>
      <th>Nömrəsi</th>

      <th>Status</th>
      {/* barn user */}

      <th>Adı</th>

      <th>Yeri</th>

      <th>Mesajı </th>

      {/* stocks* */}
      <th>Yeni </th>

      <th>İşlənmiş</th>

      <th>Yararsız</th>

      <th>Ümumi</th>

      {/* client user */}
      <th>Adı</th>

      <th>Yeri</th>

      <th>Mesajı</th>
    </tr>
  </thead>
)

export default OrderTableHeader
