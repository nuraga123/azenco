import React from 'react'
import { IOrderItem } from '@/types/order'
import OrderTableHeader from './OrderTableHeader'
import OrderTableItem from './OrderTableItem'
import { $navbarIsOpen } from '@/context/navbar'

import styles from '@/styles/order/my/index.module.scss'
import { useStore } from 'effector-react'

const OrderTableList = ({
  orders,
  type,
  onRefresh,
}: {
  orders: IOrderItem[]
  type: 'clientUser' | 'barnUser'
  onRefresh: () => void
}) => {
  const navbarIsOpen = useStore($navbarIsOpen)
  console.log(orders)

  return (
    <div
      className={
        navbarIsOpen === 'open'
          ? styles.tableContainer_open
          : styles.tableContainer_close
      }
    >
      {orders ? (
        <table className={styles.orderTable}>
          <OrderTableHeader type={type} />
          <tbody>
            {orders.map((order: IOrderItem, index: number) => (
              <OrderTableItem
                type={type}
                key={+order.id}
                order={order}
                index={index}
                onRefresh={onRefresh}
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
