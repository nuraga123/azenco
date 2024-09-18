import React from 'react'

import { IOrderTableItemProps, TStatusOrderType } from '@/types/order'
import { formatDateTime } from '@/utils/formatDateTime'
import OrderTypeBtns from './OrderTypeBtns'

import styles from '@/styles/order/my/index.module.scss'

const statusColorCurrent = (status: TStatusOrderType) => {
  if (status === 'yeni_sifariş') return 'gray'

  if (status === 'müştəri_sifarişi_ləğv_etdi') return 'maroon'

  if (status === 'sifariş_anbardar_tərəfindən_ləğv_edildi') return 'crimson'

  if (status === 'anbardar_sifarişi_qəbul_etdi') return 'gold'

  if (status === 'anbardar_tam_sifarişi_müştəriyə_göndərdi') return 'skyblue'

  if (status === 'sifariş_uğurla_çatdırıldı') return 'limegreen'

  if (status === 'anbardar_tam_sifarişi_müştəriyə_göndərməyib') return 'coral'

  if (status === 'sifariş_itki_və_ziyanla_çatdırıldı') return 'firebrick'

  if (status === 'sifariş_yararsız_çatdırıldı') return 'darkred'

  if (status === 'sifariş_itki_ilə_çatdırıldı') return 'tomato'

  if (status === 'sifariş_çatdırılmadı') return 'darkorange'

  return ''
}

const OrderTableItem = ({ order, type, index }: IOrderTableItemProps) => {
  const {
    id,
    // взять с сервера
    status,

    // barn
    barnUsername,
    barnLocation,
    barnUserMessage,
    createdAt,
    updatedAt,
    newStock,
    productName,
    totalStock,
    usedStock,
    azencoCode,
    brokenStock,
    unit,
    price,
    totalPrice,
    clientUserName,
    clientLocation,
    clientMessage,
  } = order

  const formatStock = (stock: number) => (stock === 0 ? '🚫' : +stock)
  const isStringLength = (str: string) => (str.length === 0 ? '➖' : str)

  const confirmed = order.status === 'anbardar_sifarişi_qəbul_etdi'

  return (
    <tr className={confirmed ? styles.confirmedRow : styles.orderRow}>
      <td>
        <OrderTypeBtns type={type} order={order} />
      </td>
      <td>{` ${+index + 1}) `}</td>

      <td className={styles.result}>
        {`Sifariş  № `}
        <strong>{+id}</strong>
      </td>

      <td className={styles[statusColorCurrent(status)]}>
        {status?.replaceAll('_', ' ')}
      </td>

      <td>{type === 'clientUser' ? barnUsername : clientUserName}</td>

      <td>{type === 'clientUser' ? barnLocation : clientLocation}</td>

      <td>
        {type === 'clientUser'
          ? isStringLength(barnUserMessage)
          : isStringLength(clientMessage)}
      </td>

      <td>
        <i>{productName}</i>
      </td>

      <td>{azencoCode}</td>

      <td>{formatStock(+newStock)}</td>
      <td>{formatStock(+usedStock)}</td>
      <td>{formatStock(+brokenStock)}</td>
      <td>
        <strong>{formatStock(+totalStock)}</strong>
      </td>

      <td>{unit}</td>

      <td>{+price}</td>

      <td>
        <strong>{+totalPrice}</strong>
      </td>

      <td>
        {updatedAt ? formatDateTime(updatedAt) : formatDateTime(createdAt)}
      </td>

      <td>{type === 'clientUser' ? clientUserName : barnUsername}</td>

      <td>{type === 'clientUser' ? clientLocation : barnLocation}</td>

      <td>
        {type === 'clientUser'
          ? isStringLength(clientMessage)
          : isStringLength(barnUserMessage)}
      </td>
    </tr>
  )
}

export default OrderTableItem
