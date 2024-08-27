import React from 'react'
import { IBarnItem } from '@/types/barn'
import styles from '@/styles/barn/order/index.module.scss'

interface Props {
  barns: IBarnItem[]
  onOrderClick: (barn: IBarnItem) => void
}

const BarnTable: React.FC<Props> = ({ barns, onOrderClick }) => (
  <table className={styles.barnTable}>
    <thead>
      <tr>
        <th className={styles.btn__title}>Sifariş</th>
        <th className={styles.azencoCode}>Azenco Kodu</th>
        <th className={styles.name}>Məhsulun adı</th>
        <th>Yeni miqdarı</th>
        <th>İşlənmiş miqdarı</th>
        <th>Yararsız miqdarı</th>
        <th>Ümumi miqdar</th>
        <th>Qiymət</th>
        <th>Yerləşmə</th>
      </tr>
    </thead>
    <tbody>
      {barns?.map((barn) => (
        <tr key={barn.id}>
          <td className={`${styles.btns}`}>
            <button onClick={() => onOrderClick(barn)}>sifariş edin</button>
          </td>

          <td className={styles.azencoCode}>{barn.azencoCode}</td>
          <td className={styles.name}>
            <b>{barn.productName}</b>
          </td>
          <td>{+barn.newStock === 0 ? 'yoxdur' : +barn.newStock}</td>
          <td>{+barn.usedStock === 0 ? 'yoxdur' : +barn.usedStock}</td>
          <td>{+barn.brokenStock === 0 ? 'yoxdur' : +barn.brokenStock}</td>
          <td>
            <b>{+barn.totalStock}</b>
          </td>
          <td>
            <b>{+barn.price}</b>
          </td>
          <td>{barn.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default BarnTable
