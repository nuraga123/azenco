import React from 'react'
import { IOrderItem } from '@/types/order'
import OrderTableHeader from './OrderTableHeader'
import OrderTableItem from './OrderTableItem'

import styles from '@/styles/order/my/index.module.scss'

const OrderTableList = ({
  orders,
  type,
}: {
  orders: IOrderItem[]
  type: 'clientUser' | 'barnUser'
}) => {
  console.log(orders)

  return (
    <div className={styles.tableContainer}>
      {orders.length > 0 ? (
        <table className={styles.orderTable}>
          <OrderTableHeader type={type} />
          <tbody>
            {orders.map((order: IOrderItem, index) => (
              <OrderTableItem
                type={type}
                key={+order.id}
                order={order}
                index={index}
                onConfirm={() => order.id}
                onCancel={() => order.id}
                onDelete={() => order.id}
              />
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
