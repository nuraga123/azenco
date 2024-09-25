import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { sendOrderBarnUserFx } from '@/app/api/order'
import { IMessageAndErrorMessage } from '@/types/order'
import Spinner from '../../Spinner/Spinner'
import { ISendModal } from '@/types/order'
import styles from '@/styles/order/their/modal/index.module.scss'
import CloseBtn from '@/components/elements/btn/CloseBtn'
import EditBtn from '@/components/elements/btn/EditBtn'
import SuccessBtn from '@/components/elements/btn/SuccessBtn'

const SendModal: React.FC<ISendModal> = ({ order, onClose }) => {
  const [spinner, setSpinner] = useState<boolean>(false)
  const [isPartial, setIsPartial] = useState<boolean>(false)
  const [showMethod, setShowMethod] = useState<boolean>(false)
  const [active, setActive] = useState<'full' | 'partial' | 'none'>('none')

  const [barnLocationProduct, setBarnLocationProduct] = useState<string>('')
  const [isLocationChange, setIsLocationChange] = useState<boolean>(false)
  const [userSelectedDate, setUserSelectedDate] = useState<string>('')
  const [barnUserMessage, setBarnUserMessage] = useState<string>('')
  const [driverName, setDriverName] = useState<string>('')
  const [carNumber, setCarNumber] = useState<string>('')

  const [updatePrice, setUpdatePrice] = useState<string>('')
  const [isUpdatePrice, setIsUpdatePrice] = useState<boolean>(false)
  const [newStockSend, setNewStockSend] = useState<string>('')
  const [usedStockSend, setUsedStockSend] = useState<string>('')
  const [brokenStockSend, setBrokenStockSend] = useState<string>('')

  const handleSendBarnUser = async (isFullOrder: boolean) => {
    try {
      setSpinner(true)

      const { message, error_message }: IMessageAndErrorMessage =
        await sendOrderBarnUserFx({
          driverName,
          carNumber,
          userSelectedDate,
          barnUserMessage,
          newStockSend: isFullOrder ? +order.newStock : +newStockSend,
          usedStockSend: isFullOrder ? +order.usedStock : +usedStockSend,
          brokenStockSend: isFullOrder ? +order.brokenStock : +brokenStockSend,
          updatePrice: updatePrice ? +updatePrice : +order.price,
          barnLocationProduct: barnLocationProduct || order.barnLocation,
          barnId: order.barnId,
          barnUsername: order.barnUsername,
          barnUserId: order.barnUserId,
          orderId: order.id,
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

  const fullShowModal = () => {
    setShowMethod(true)
    setIsPartial(false)
    setActive('full')
  }

  const partialShowModal = () => {
    setShowMethod(true)
    setIsPartial(true)
    setActive('partial')
  }

  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal__content}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <div className={styles.modal__switchers}>
            <div
              className={`${styles.switcher} ${
                active === 'full' ? styles.active : styles.inactive
              }`}
              onClick={fullShowModal}
            >
              {spinner ? <Spinner margins="0px" /> : 'Tam göndər'}
            </div>

            <div
              className={`${styles.switcher} ${
                active === 'partial' ? styles.active : styles.inactive
              }`}
              onClick={partialShowModal}
            >
              {spinner ? <Spinner margins="0px" /> : 'Qismən göndər'}
            </div>
          </div>
          <CloseBtn fn={onClose} />
        </div>
        <br />

        {showMethod && (
          <>
            <div className={styles.modal__field}>
              <h3>
                Sifarişi {isPartial ? 'Qismən' : 'Tam'} Göndərməsi Formasi
              </h3>
            </div>
            <br />

            <div className={styles.modal__flex}>
              <div className={styles.modal__field}>
                <label className={styles.modal__label}>Şoferin Adı:</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className={`${styles.modal__input} ${styles.modal__input__max}`}
                  placeholder="Şoferin adını daxil edin"
                />
              </div>

              <div className={styles.modal__field}>
                <label className={styles.modal__label}>Maşın Nömrəsi:</label>
                <input
                  type="text"
                  value={carNumber}
                  onChange={(e) => setCarNumber(e.target.value)}
                  className={`${styles.modal__input} ${styles.modal__input__min}`}
                  placeholder="Maşın nömrəsini daxil edin"
                />
              </div>
            </div>

            <div className={styles.modal__flex}>
              <div className={styles.modal__field}>
                <label className={styles.modal__label}>Sifariş qeydi:</label>
                <input
                  type="text"
                  value={barnUserMessage}
                  onChange={(e) => setBarnUserMessage(e.target.value)}
                  className={`${styles.modal__input} ${styles.modal__input__max}`}
                  placeholder="Məsələn saat 17:00-a qədər çatdırmağınız xahiş olunur"
                />
              </div>

              <div className={styles.modal__field}>
                <label className={styles.modal__label}>Göndərmə Tarixi:</label>
                <input
                  type="date"
                  value={userSelectedDate}
                  onChange={(e) => setUserSelectedDate(e.target.value)}
                  className={`${styles.modal__input} ${styles.modal__input__min}`}
                />
              </div>
            </div>
            <div className={styles.modal__field}>
              <label className={styles.modal__label}>
                <div className={styles.modal__flex}>
                  <div>
                    Materialın yeri bu ünvanda deyilsə:
                    <strong> "{order.barnLocation}"</strong>, onda
                  </div>
                  <EditBtn
                    fn={() => setIsLocationChange(!isLocationChange)}
                    text={isLocationChange ? 'Dəyişmirəm' : 'Ünvanı dəyişdir'}
                  />
                </div>
              </label>

              {isLocationChange && (
                <>
                  <label className={styles.modal__label}>
                    Dəyişdirilən yeri yazın:
                  </label>

                  <input
                    type="text"
                    value={barnLocationProduct}
                    onChange={(e) => setBarnLocationProduct(e.target.value)}
                    className={styles.modal__input}
                    placeholder="Yerini daxil edin"
                  />
                </>
              )}
            </div>

            <label className={styles.modal__label}>
              <div className={styles.modal__flex}>
                <div>
                  Materialın qiyməti
                  <strong> {+order.price} </strong>
                  manat deyilsə dəyişin:
                </div>
                <EditBtn
                  text={isUpdatePrice ? 'dəyişmirəm' : 'qiyməti dəyişdir'}
                  fn={() => setIsUpdatePrice(!isUpdatePrice)}
                />
              </div>
            </label>

            {isUpdatePrice && (
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
            )}
            <br />

            {isPartial && (
              <>
                <div className={styles.modal__flex}>
                  <div className={styles.modal__field}>
                    <label className={styles.modal__label}>Yeni Miqdar</label>
                    <input
                      type="text"
                      value={newStockSend}
                      onChange={(e) => setNewStockSend(e.target.value)}
                      className={`${styles.modal__input} ${styles.modal__input__min}`}
                      placeholder="Yeni məhsul sayını daxil edin"
                    />
                  </div>

                  <div className={styles.modal__field}>
                    <label className={styles.modal__label}>
                      İşlənmiş Miqdar
                    </label>
                    <input
                      type="text"
                      value={usedStockSend}
                      onChange={(e) => setUsedStockSend(e.target.value)}
                      className={`${styles.modal__input} ${styles.modal__input__min}`}
                      placeholder="İşlənmiş məhsul sayını daxil edin"
                    />
                  </div>

                  <div className={styles.modal__field}>
                    <label className={styles.modal__label}>
                      Yararsız Miqdar
                    </label>
                    <input
                      type="text"
                      value={brokenStockSend}
                      onChange={(e) => setBrokenStockSend(e.target.value)}
                      className={`${styles.modal__input} ${styles.modal__input__min}`}
                      placeholder="Yararsız məhsul sayını daxil edin"
                    />
                  </div>
                </div>

                {/* handleSendBarnUser(false) */}
                <div>
                  <div className={styles.modal__flex}>
                    {spinner ? (
                      <Spinner margins="0px" />
                    ) : (
                      <SuccessBtn
                        fn={() => handleSendBarnUser(false)}
                        text={'Göndər'}
                      />
                    )}
                    <button
                      onClick={onClose}
                      className={`${styles.modal__button} ${styles.modal__button__cancel}`}
                    >
                      {spinner ? <Spinner margins="0px" /> : 'Göndərməyin'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SendModal
