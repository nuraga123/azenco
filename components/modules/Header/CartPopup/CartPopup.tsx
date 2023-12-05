import Link from 'next/link'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { $mode } from '@/context/mode'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
  setTotalPrice,
} from '@/context/shopping-cart'
import { $user } from '@/context/user'
import { getCartItemsFx } from '@/app/api/shopping-cart'
import { IWrappedComponentProps } from '@/types/common'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { withClickOutside } from '@/utils/withClickOutside'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import { formatPrice } from '@/utils/common'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import CartPopupItem from './CartPopupItem'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const user = useStore($user)
    const shoppingCart = useStore($shoppingCart)
    const totalPrice = useStore($totalPrice)

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleCartDropDown = () => setOpen(!open)
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
      setSpinner(true)
    }, [shoppingCart])

    useEffect(() => {
      setSpinner(true)
      // Задержка перед выполнением подсчета
      const timeout = setTimeout(() => {
        // Подсчет totalPrice
        const calculatedTotalPrice = shoppingCart
          .filter((el) => el.in_stock !== 0)
          .reduce(
            (defaultCount: number, item: IShoppingCartItem) =>
              defaultCount + Number(item.total_price),
            0
          )
        // Обновление состояния и завершение спиннера
        setTotalPrice(calculatedTotalPrice)
        setSpinner(false)
      }, 500)

      // Очистка таймера при размонтировании компонента или изменении зависимостей
      return () => clearTimeout(timeout)
    }, [shoppingCart])

    console.log(totalPrice)

    const loadCartItems = useCallback(async () => {
      try {
        const cartItems: IShoppingCartItem[] = await getCartItemsFx(
          `/shopping-cart/${user.userId}`
        )

        setShoppingCart(cartItems)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }, [user.userId])

    useEffect(() => {
      loadCartItems()
    }, [loadCartItems])

    return (
      <div className={styles.cart} ref={ref}>
        <button
          className={`${styles.cart__btn} ${darkModeClass}`}
          onClick={toggleCartDropDown}
        >
          {!!shoppingCart.length && (
            <span className={styles.cart__btn__count}>
              {shoppingCart.length}
            </span>
          )}

          <span className={styles.cart__svg}>
            <ShoppingCartSvg />
          </span>

          <span className={styles.cart__text}>Səbət</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={`${styles.cart__popup__title} ${darkModeClass}`}>
                Səbət
              </h3>

              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item, index) => (
                    <CartPopupItem key={index} item={item} index={index + 1} />
                  ))
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Səbət boşdur
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                  >
                    Sifarişin Ümumi Məbləği
                  </span>

                  {spinner ? (
                    <span
                      className={spinnerStyles.spinner}
                      style={{ top: 360, left: '50%' }}
                    />
                  ) : (
                    <span className={styles.cart__popup__footer__price}>
                      {formatPrice(+formatFromPriceToString(totalPrice))} m.
                    </span>
                  )}
                </div>

                <Link href="/order" passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Sifariş vermək
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
