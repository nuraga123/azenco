import React from 'react'
import { IOrderItem } from '@/types/order'
import styles from '@/styles/order/index.module.scss'

interface TableRowProps {
  order: IOrderItem
}

const TableRow: React.FC<TableRowProps> = ({ order }) => (
  <tr>
    <td className={styles.tableCell}>{order.azencoCode}</td>
    <td className={styles.tableCell}>{order.productName}</td>
    <td className={styles.tableCell}>{order.newStock}</td>
    <td className={styles.tableCell}>{order.usedStock}</td>
    <td className={styles.tableCell}>{order.brokenStock}</td>
    <td className={styles.tableCell}>{order.price}</td>
    <td className={styles.tableCell}>{order.totalPrice}</td>
    <td className={styles.tableCell}>{order.unit}</td>
    <td className={styles.tableCell}>{order.info}</td>
  </tr>
)

export default TableRow
