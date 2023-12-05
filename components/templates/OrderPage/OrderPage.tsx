import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'

import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
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
            <OrderAccordion setOrderIsReady={() => {}} showDoneIcon={true} />
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
              <button className={styles.order__pay__btn}>
                {false ? (
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
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong> Правил пользования
                  торговой площадкой и правилами возврата
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
