import { $mode } from '@/context/mode'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import styles from '@/styles/order/index.module.scss'
import { formatPrice } from '@/utils/common'
import { useStore } from 'effector-react'

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
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Sifarişin verilməsi
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <div />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Nəticə
            </h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>Malların sayı: ({quantityShoppingCart})</span>
                <span>{formatPrice(totalPrice)} manat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
