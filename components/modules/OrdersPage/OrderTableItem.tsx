import React, { useState } from 'react'
import { IOrderItem } from '@/types/order'
import { formatDateTime } from '@/utils/formatDateTime'
import styles from '@/styles/order/my/index.module.scss'
import { confirmBarnUserFx, IOrderResponce } from '@/app/api/order'
import { toast } from 'react-toastify'

interface OrderTableItemProps {
  order: IOrderItem
  type: 'clientUser' | 'barnUser'
  index: number
  onConfirm: (orderId: number) => void
  onCancel: (orderId: number) => void
  onDelete: (orderId: number) => void
}

const OrderTableItem = ({
  order,
  type,
  index,
  onConfirm,
  onCancel,
  onDelete,
}: OrderTableItemProps) => {
  const {
    id,
    // взять с сервера
    status,

    // barn
    barnUsername,
    barnLocation,
    barnUserMessage,
    barnId,
    barnUserId,

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

  const [spinner, setSpinner] = useState(false)
  const formatStock = (stock: number) => (stock === 0 ? '🚫' : +stock)
  const isStringLength = (str: string) => (str.length === 0 ? '➖' : str)

  const confirmed = order.status === 'anbardar_sifarişi_qəbul_etdi'
  const userSelectDate = formatDateTime(new Date().toISOString())

  const handleConfirm = async () => {
    try {
      setSpinner(true)

      // дополнительное поля для проверки клиента
      const confirmedOrder: IOrderResponce = await confirmBarnUserFx({
        orderId: id,
        barnId,
        barnUserId,
        barnUsername,
        userSelectDate,
        barnUserMessage,
      })

      console.log(confirmedOrder)

      if (confirmedOrder?.error_message)
        toast.warning(confirmedOrder?.error_message)

      toast.success(confirmedOrder?.message)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }

    onConfirm(order.id)
  }

  const handleCancel = () => {
    onCancel(order.id)
  }

  const handleDelete = () => {
    onDelete(order.id)
  }

  return (
    <tr className={confirmed ? styles.confirmedRow : styles.orderRow}>
      <td>
        {type === 'clientUser' ? (
          <button onClick={handleDelete} className={styles.deleteButton}>
            Sil
          </button>
        ) : confirmed ? (
          <button className={styles.sendButton}>Göndər</button>
        ) : (
          <>
            <button onClick={handleConfirm} className={styles.confirmButton}>
              {spinner ? 'load' : 'Təsdiq edin'}
            </button>

            <button onClick={handleCancel} className={styles.cancelButton}>
              Ləğv et
            </button>
          </>
        )}
      </td>
      <td>{` ${+index + 1}) `}</td>

      <td>
        {`Sifariş  № `}
        <strong>{+id}</strong>
      </td>

      <td>{status}</td>

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
