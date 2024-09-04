import React from 'react'
import { IOrderItem } from '@/types/order'
import styles from '@/styles/order/my/index.module.scss'

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
      <td>{''}</td>
      <td>{` ${+index + 1}) `}</td>

      <td>
        {`Sifariş  № `}
        <strong>{+order.id}</strong>
      </td>

      <td>{order.status}</td>

      <td>{order.barnUsername}</td>

      <td>{order.clientLocation}</td>

      <td className={styles.productName}>{order.productName}</td>

      <td>{order.azencoCode}</td>

      <td>{formatStock(+order.newStock)}</td>
      <td>{formatStock(+order.usedStock)}</td>
      <td>{formatStock(+order.brokenStock)}</td>
      <td>{formatStock(+order.totalStock)}</td>

      <td>{order.unit}</td>
      <td>{+order.price} AZN</td>
      <td>{+order.totalPrice} AZN</td>
      <td>{new Date(order.createdAt).toLocaleString()}</td>
    </tr>
  )
}

export default OrderTableItem
