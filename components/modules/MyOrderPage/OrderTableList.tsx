import React from 'react'
import { IOrderItem } from '@/types/order'
import OrderTableHeader from './OrderTableHeader'
import OrderTableItem from './OrderTableItem'

import styles from '@/styles/order/my/index.module.scss'

const OrderTableList = ({ orders }: { orders: IOrderItem[] }) => {
  console.log(orders)

  return (
    <div className={styles.tableContainer}>
      {orders.length > 0 ? (
        <table className={styles.orderTable}>
          <OrderTableHeader />
          <tbody>
            {orders.map((order: IOrderItem, index) => (
              <OrderTableItem key={order.id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noOrdersMessage}>Sifarişlərin siyahısı boşdur</p>
      )}
    </div>
  )
}

export default OrderTableList
