/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import {
  $shoppingCart,
  setShoppingCart,
  setTotalPrice,
} from '@/context/shopping-cart'
import { IShoppingCartItem } from '@/types/shopping-cart'
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
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)

  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()

  const handleAgreementChange = () => setAgreement(!agreement)

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      })

      if (data.status === 'succeeded') {
        toast.success('Ödəniş edildi')
        resetCart()
        console.log(data)
        return
      }

      if (data.status === 'pending') {
        toast.warning('Ödəniş edilməmişdir')
      }

      sessionStorage.removeItem('paymentId')
    } catch (error) {
      console.log((error as Error).message)
      resetCart()
    }
  }

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [])

  useEffect(() => {
    const calculatedTotalPrice = shoppingCart
      .filter((el) => el.in_stock !== 0)
      .reduce(
        (defaultCount: number, item: IShoppingCartItem) =>
          defaultCount + Number(item.total_price),
        0
      )

    console.log()
    setTotalPrice(calculatedTotalPrice)
  }, [shoppingCart])

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: Number(formatFromPriceToString(shoppingCartTotalPrice)),
        description: `Заказ №1`,
      })

      sessionStorage.setItem('paymentId', data.id)
      console.log(data)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    await removeFromCartFx(`/shopping-cart/all/${user.id}`)
    setShoppingCart([])
  }

  const quantityShoppingCart = shoppingCart.reduce(
    (defaultCount, item) => defaultCount + item.count,
    0
  )

  const shoppingCartTotalPrice = shoppingCart.reduce(
    (defaultCount: number, item: IShoppingCartItem) =>
      defaultCount + +item.total_price,
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
                  {formatPrice(
                    +formatFromPriceToString(shoppingCartTotalPrice)
                  )}{' '}
                  manat
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
