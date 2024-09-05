import React from 'react'
import { IOrderItem } from '@/types/order'
import styles from '@/styles/order/my/index.module.scss'
import { formatDateTime } from '@/utils/formatDateTime'

const OrderTableItem = ({
  order,
  index = 0,
}: {
  order: IOrderItem
  index: number
}) => {
  console.log(order)

  const formatStock = (stock: number) => (stock === 0 ? '➖' : +stock)

  return (
    <tr>
      <td>1</td>
      <td>{` ${+index + 1}) `}</td>

      <td>
        {`Sifariş  № `}
        <strong>{+order.id}</strong>
      </td>

      <td>{order.status}</td>

      <td className={styles.no_wrap}>{order.barnUsername}</td>

      <td className={styles.no_wrap}>{order.clientLocation}</td>

      <td className={styles.productName}>{order.productName}</td>

      <td>{order.azencoCode}</td>

      <td>{formatStock(+order.newStock)}</td>
      <td>{formatStock(+order.usedStock)}</td>
      <td>{formatStock(+order.brokenStock)}</td>
      <td>
        <strong>{formatStock(+order.totalStock)}</strong>
      </td>

      <td>{order.unit}</td>

      <td>{+order.price}</td>

      <td>
        <strong>{+order.totalPrice}</strong>
      </td>

      <td>
        {order.updatedAt
          ? formatDateTime(order.updatedAt)
          : formatDateTime(order.createdAt)}
      </td>
    </tr>
  )
}

export default OrderTableItem
