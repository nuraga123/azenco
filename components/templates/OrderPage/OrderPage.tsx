import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import { $mode } from '@/context/mode'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'

import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { $user } from '@/context/user'

import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()

  const handleAgreementChange = () => setAgreement(!agreement)

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [])

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: `Заказ №1`,
      })

      sessionStorage.setItem('paymentId', data.id)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      })

      if (data.status === 'succeeded') {
        resetCart()
        return
      }

      sessionStorage.removeItem('paymentId')
    } catch (error) {
      console.log((error as Error).message)
      resetCart()
    }
  }

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
    setShoppingCart([])
  }

  const quantityShoppingCart = shoppingCart.reduce(
    (defaultCount, item) => defaultCount + item.count,
    0
  )

  return (
    <section className={styles.order}>
      <div className="container">
        <br />
        <br />
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Sifarişin verilməsi
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Nəticə
            </h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div
                className={styles.order__pay__total}
                style={{ borderBottom: '1px solid' }}
              >
                <span>Malların sayı: </span>
                <span
                  className={`${styles.order__pay__total__title} ${darkModeClass}`}
                >
                  {quantityShoppingCart} ədəd
                </span>
              </div>
              <div
                className={styles.order__pay__total}
                style={{ borderBottom: '1px solid' }}
              >
                <span>Ümumi məbləği: </span>
                <span
                  className={`${styles.order__pay__total__title} ${darkModeClass}`}
                >
                  {formatPrice(+formatFromPriceToString(totalPrice))} manat
                </span>
              </div>
              <button
                className={styles.order__pay__btn}
                disabled={!(orderIsReady && agreement)}
                onClick={makePay}
              >
                {spinner ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: '6px', left: '47%' }}
                  />
                ) : (
                  'Sifarişi təsdiqləyin'
                )}
              </button>
              <label
                className={`${styles.order__pay__rights} ${darkModeClass}`}
              >
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Mən şərtlərlə razıyam</strong> İstifadə qaydaları
                  ticarət platforması və qaytarma qaydaları
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
