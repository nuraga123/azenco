import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { confirmBarnUserFx, deleteOrderFromClientFx } from '@/app/api/order'
import {
  IMessageAndErrorMessage,
  IOrderItem,
  StatusOrderType,
} from '@/types/order'
import { formatDateTime } from '@/utils/formatDateTime'
import Spinner from '../Spinner/Spinner'

import styles from '@/styles/order/my/index.module.scss'

interface OrderTableItemProps {
  order: IOrderItem
  type: 'clientUser' | 'barnUser'
  index: number
}

const statusColorCurrent = (status: StatusOrderType) => {
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

const OrderTableItem = ({ order, type, index }: OrderTableItemProps) => {
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
    productId,
    azencoCode,
    brokenStock,
    unit,
    price,
    totalPrice,
    clientId,
    clientUserName,
    clientLocation,
    clientMessage,
  } = order

  const [spinner, setSpinner] = useState(false)
  const formatStock = (stock: number) => (stock === 0 ? '🚫' : +stock)
  const isStringLength = (str: string) => (str.length === 0 ? '➖' : str)

  const confirmed = order.status === 'anbardar_sifarişi_qəbul_etdi'
  const userSelectDate = formatDateTime(new Date().toISOString())

  const handleConfirmBarnUser = async () => {
    try {
      setSpinner(true)

      // дополнительное поля для проверки клиента
      const { message, error_message }: IMessageAndErrorMessage =
        await confirmBarnUserFx({
          barnId,
          barnUserId,
          orderId: +id,
          barnUsername,
          userSelectDate,
          barnUserMessage,
        })

      console.log(message)

      if (error_message) toast.warning(error_message)

      if (message) toast.success(message)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const handleCancelBarnUser = () => {}

  const handleDeleteClient = async () => {
    try {
      setSpinner(true)
      const { message } = await deleteOrderFromClientFx({
        orderId: id,
        clientId,
        productId,
        azencoCode,
        productName,
        clientUserName,
      })

      if (message) toast.success(message)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const clientType = Boolean(type === 'clientUser')
  const barnUserType = Boolean(type === 'barnUser')

  const deleteBtnClient: boolean = Boolean(
    status === 'yeni_sifariş' ||
      status === 'müştəri_sifarişi_ləğv_etdi' ||
      status === 'sifariş_anbardar_tərəfindən_ləğv_edildi'
  )

  const confirmedBtnBarnUser: boolean = Boolean(status === 'yeni_sifariş')

  const cancelBtnBarnUser: boolean = Boolean(status === 'yeni_sifariş')

  const sendBtnBarnUser: boolean = Boolean(
    status === 'anbardar_sifarişi_qəbul_etdi'
  )

  const TypeBtns = () => {
    if (clientType) {
      return (
        <div>
          {deleteBtnClient && (
            <button
              onClick={handleDeleteClient}
              className={styles.deleteButton}
            >
              {spinner ? <Spinner /> : 'Sil'}
            </button>
          )}
        </div>
      )
    } else if (barnUserType) {
      return (
        <div>
          {confirmedBtnBarnUser && (
            <button
              onClick={handleConfirmBarnUser}
              className={styles.confirmButton}
            >
              {spinner ? <Spinner /> : 'Təsdiq edin'}
            </button>
          )}

          {cancelBtnBarnUser && (
            <button
              onClick={handleCancelBarnUser}
              className={styles.cancelButton}
            >
              {spinner ? <Spinner /> : 'Ləğv edin'}
            </button>
          )}

          {sendBtnBarnUser && (
            <button onClick={handleSendBarnUser} className={styles.sendButton}>
              {spinner ? <Spinner /> : 'Göndər'}
            </button>
          )}
        </div>
      )
    }
  }

  return (
    <tr className={confirmed ? styles.confirmedRow : styles.orderRow}>
      <td>
        {<TypeBtns />}
        {confirmed ? (
          <button className={styles.sendButton}>Göndər</button>
        ) : (
          <>
            <button onClick={handleConfirm} className={styles.confirmButton}>
              {spinner ? 'load' : 'Təsdiq edin'}
            </button>
          </>
        )}
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
