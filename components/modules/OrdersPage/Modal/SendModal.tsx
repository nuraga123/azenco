import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { sendOrderBarnUserFx } from '@/app/api/order'
import { IMessageAndErrorMessage } from '@/types/order'
import Spinner from '../../Spinner/Spinner'
import { ISendModal } from '@/types/order'
import styles from '@/styles/order/their/modal/index.module.scss'

const SendModal: React.FC<ISendModal> = ({ order, onClose }) => {
  const [spinner, setSpinner] = useState<boolean>(false)
  const [isPartial, setIsPartial] = useState<boolean>(false)

  const [barnLocationProduct, setBarnLocationProduct] = useState<string>('')
  const [userSelectedDate, setUserSelectedDate] = useState<string>('')
  const [barnUserMessage, setBarnUserMessage] = useState<string>('')
  const [driverName, setDriverName] = useState<string>('')
  const [carNumber, setCarNumber] = useState<string>('')

  const [updatePrice, setUpdatePrice] = useState<string>('')
  const [newStockSend, setNewStockSend] = useState<string>('')
  const [usedStockSend, setUsedStockSend] = useState<string>('')
  const [brokenStockSend, setBrokenStockSend] = useState<string>('')

  const handleSendBarnUser = async (isFullOrder: boolean) => {
    try {
      setSpinner(true)

      const { message, error_message }: IMessageAndErrorMessage =
        await sendOrderBarnUserFx({
          orderId: order.id,
          barnUserId: order.barnUserId,
          barnUsername: order.barnUsername,
          barnLocationProduct: barnLocationProduct || order.barnLocation,
          barnId: order.barnId,
          driverName,
          carNumber,
          userSelectedDate,
          newStockSend: isFullOrder ? +order.newStock : +newStockSend,
          usedStockSend: isFullOrder ? +order.usedStock : +usedStockSend,
          brokenStockSend: isFullOrder ? +order.brokenStock : +brokenStockSend,
          updatePrice: updatePrice ? +updatePrice : +order.price,
          barnUserMessage,
        })

      if (error_message) toast.warning(error_message)

      if (message) {
        toast.success(message)
        onClose()
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal__content}>
        <div className={styles.modal__flex}>
          <h2 className={styles.modal__title}>Sifarişi Göndərməsi Formasi</h2>
          <button onClick={onClose} className={styles.cancelButton}>X</button>
        </div>

        <div className={styles.modal__field}>
          <label className={styles.modal__label}>Şoferin Adı:</label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className={styles.modal__input}
            placeholder="Şoferin adını daxil edin"
          />
        </div>
        <div className={styles.modal__field}>
          <label className={styles.modal__label}>Maşın Nömrəsi:</label>
          <input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className={styles.modal__input}
            placeholder="Maşın nömrəsini daxil edin"
          />
        </div>
        <div className={styles.modal__field}>
          <label className={styles.modal__label}>Maşın Nömrəsi:</label>
          <input
            type="text"
            value={barnUserMessage}
            onChange={(e) => setBarnUserMessage(e.target.value)}
            className={styles.modal__input}
            placeholder="sms daxil edin"
          />
        </div>
        <div className={styles.modal__field}>
          <label className={styles.modal__label}>Göndərmə Tarixi:</label>
          <input
            type="date"
            value={userSelectedDate}
            onChange={(e) => setUserSelectedDate(e.target.value)}
            className={styles.modal__input}
          />
        </div>

        {!isPartial ? (
          <>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>Stok Məhsul Yeri:</label>
              <input
                type="text"
                value={barnLocationProduct}
                onChange={(e) => setBarnLocationProduct(e.target.value)}
                className={styles.modal__input}
                placeholder="Stok yerini daxil edin"
              />
            </div>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>Qiyməti yenilə:</label>
              <input
                type="text"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
                className={styles.modal__input}
                placeholder="Qiyməti daxil edin"
              />
            </div>
            <button
              onClick={() => handleSendBarnUser(true)}
              className={`${styles.modal__button} ${styles.modal__button__send}`}
            >
              {spinner ? <Spinner /> : 'Tam göndər'}
            </button>
            <button
              onClick={() => setIsPartial(true)}
              className={`${styles.modal__button} ${styles.modal__button__partial}`}
            >
              {spinner ? <Spinner /> : 'Qismən göndər'}
            </button>
          </>
        ) : (
          <div>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>Yeni Məhsul Sayı:</label>
              <input
                type="text"
                value={newStockSend}
                onChange={(e) => setNewStockSend(e.target.value)}
                className={styles.modal__input}
                placeholder="Yeni məhsul sayını daxil edin"
              />
            </div>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>
                İşlənmiş Məhsul Sayı:
              </label>
              <input
                type="text"
                value={usedStockSend}
                onChange={(e) => setUsedStockSend(e.target.value)}
                className={styles.modal__input}
                placeholder="İşlənmiş məhsul sayını daxil edin"
              />
            </div>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>
                Yararsız Məhsul Sayı:
              </label>
              <input
                type="text"
                value={brokenStockSend}
                onChange={(e) => setBrokenStockSend(e.target.value)}
                className={styles.modal__input}
                placeholder="Yararsız məhsul sayını daxil edin"
              />
            </div>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>Qiyməti yenilə:</label>
              <input
                type="text"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
                className={styles.modal__input}
                placeholder="Qiyməti daxil edin"
              />
            </div>
            <button
              onClick={() => handleSendBarnUser(false)}
              className={`${styles.modal__button} ${styles.modal__button__send}`}
            >
              {spinner ? <Spinner /> : 'Göndər'}
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className={`${styles.modal__button} ${styles.modal__button__cancel}`}
        >
          {spinner ? <Spinner /> : 'Göndərməyin'}
        </button>
      </div>
    </div>
  )
}

export default SendModal
