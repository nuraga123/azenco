import React from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { IOrderItem } from '@/types/order'
import styles from '@/styles/order/index.module.scss'

interface TableProps {
  orders: IOrderItem[]
}

const OrderTable: React.FC<TableProps> = ({ orders }) => {
  console.log(orders)
  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody>
        {orders.map((order) => (
          <TableRow key={+order.id} order={order} />
        ))}
      </tbody>
    </table>
  )
}

export default OrderTable
