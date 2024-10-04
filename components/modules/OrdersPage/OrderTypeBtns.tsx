import React, { useState } from 'react'

import styles from '@/styles/order/my/index.module.scss'
import {
  confirmOrderBarnUserFx,
  deleteOrderFromClientFx,
  postCanceledOrderClientFx,
} from '@/app/api/order'
import { IMessageAndErrorMessage, ITypeOrderBtns } from '@/types/order'
import { toast } from 'react-toastify'
import Spinner from '../Spinner/Spinner'
import { formatDateTime } from '@/utils/formatDateTime'
import SendModal from './Modal/SendModal'

const OrderTypeBtns = ({ type, order, onRefresh }: ITypeOrderBtns) => {
  const [spinner, setSpinner] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const {
    id,
    status,

    // barn
    barnId,
    barnUserId,
    barnUsername,

    // client
    clientId,
    clientUserName,

    // product
    productId,
    azencoCode,
    productName,
  } = order

  // состояния
  const canceledBtnClient: boolean = Boolean(status === 'yeni_sifariş')

  const deletedBtnClient: boolean = Boolean(
    status === 'müştəri_sifarişi_ləğv_etdi' ||
      status === 'sifariş_anbardar_tərəfindən_ləğv_edildi'
  )

  const confirmedBtnBarnUser: boolean = Boolean(status === 'yeni_sifariş')

  const cancelBtnBarnUser: boolean = Boolean(status === 'yeni_sifariş')

  const sendBtnBarnUser: boolean = Boolean(
    status === 'anbardar_sifarişi_qəbul_etdi'
  )

  const clientType = Boolean(type === 'clientUser')
  const barnUserType = Boolean(type === 'barnUser')

  // функции складчика
  const handleConfirmBarnUser = async () => {
    try {
      setSpinner(true)

      // дополнительное поля для проверки клиента
      const { message, error_message }: IMessageAndErrorMessage =
        await confirmOrderBarnUserFx({
          barnId,
          barnUserId,
          barnUsername,
          orderId: +id,
          userSelectDate: formatDateTime(new Date().toISOString()),
          barnUserMessage: '',
        })

      console.log(message)

      if (error_message) toast.warning(error_message)

      if (message) {
        toast.success(message)
        onRefresh()
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const handleCancelBarnUser = async () => {
    try {
    } catch (error) {}
  }

  const handleOpenModal = () => setOpenModal(!openModal)

  /*
  const handleSendBarnUser = async () => {
    const { message, error_message } = await sendBarnUserFx({
      orderId: id,
      barnUserId,
      barnUsername,
      barnLocationProduct: barnLocationProduct
        ? barnLocationProduct
        : order.barnLocation,
      barnId,
      driverName,
      carNumber,
      userSelectedDate,
      newStockSend,
      usedStockSend,
      brokenStockSend,
      updatePrice,
    })

    if (error_message) toast.warning(error_message)
    if (message) toast.success(message)
  }
*/
  // функции клиента
  const handleCancelClient = async () => {
    try {
      setSpinner(true)
      const { message } = await postCanceledOrderClientFx({
        orderId: id,
        clientId,
        productId,
        azencoCode,
        productName,
        clientUserName,
      })

      if (message) {
        toast.success(message)
        onRefresh()
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

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

      if (message) {
        toast.success(message)
        onRefresh()
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  if (clientType) {
    return (
      <div>
        {canceledBtnClient && (
          <button onClick={handleCancelClient} className={styles.deleteButton}>
            {spinner ? <Spinner /> : 'Ləğv edin'}
          </button>
        )}

        {deletedBtnClient && (
          <button onClick={handleDeleteClient} className={styles.deleteButton}>
            {spinner ? <Spinner /> : 'Sil'}
          </button>
        )}

        {sendBtnBarnUser && <p>Anbardarın göndərməsini gözləyin</p>}
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
          <button onClick={handleOpenModal} className={styles.sendButton}>
            {spinner ? <Spinner /> : 'Göndər'}
          </button>
        )}

        {openModal && <SendModal order={order} onClose={handleOpenModal} />}
        {openModal && 'Göndər'}
      </div>
    )
  }
}

export default OrderTypeBtns
