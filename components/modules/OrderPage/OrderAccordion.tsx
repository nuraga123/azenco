import { useState } from 'react'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import { IOrderAccordionProps } from '@/types/order'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { $mode } from '@/context/mode'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import CartPopupItem from '@/components/modules/Header/CartPopup/CartPopupItem'
import DoneSvg from '@/components/elements/DoneSvg/DoneSvg'
import EditSvg from '@/components/elements/EditSvg/EditSvg'
import OrderItem from './OrderItem'
import { formatPrice } from '@/utils/common'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import styles from '@/styles/order/index.module.scss'

const OrderAccordion = ({
  setOrderIsReady,
  showDoneIcon,
}: IOrderAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)

  const isMedia550 = useMediaQuery(550)

  const [expanded, setExpanded] = useState(true)

  const openAccordion = () => {
    setOrderIsReady(false)
    setExpanded(true)
  }

  const closeAccordion = () => {
    setOrderIsReady(true)
    setExpanded(false)
  }

  return (
    <>
      <motion.div
        initial={false}
        className={`${styles.order__cart__title} ${darkModeClass}`}
      >
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Səbət
        </h3>
        <button
          className={styles.order__cart__title__btn}
          onClick={openAccordion}
        >
          <span>
            <EditSvg />
          </span>
          {isMedia550 ? '' : 'Sifarişi düzəlt'}
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`${styles.order__cart__content} ${darkModeClass}`}>
              <ul className={styles.order__cart__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item, index) =>
                    isMedia550 ? (
                      <CartPopupItem key={item.id} item={item} index={index} />
                    ) : (
                      <OrderItem index={index + 1} item={item} key={item.id} />
                    )
                  )
                ) : (
                  <li className={styles.order__cart__empty}>
                    <span
                      className={`${styles.order__cart__empty__text} ${darkModeClass}`}
                    >
                      Səbət Boşdur
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.order__cart__footer}>
                <div className={styles.order__cart__footer__total}>
                  <span
                    className={`${styles.order__cart__footer__text} ${darkModeClass}`}
                  >
                    Sifarişin Ümumi Məbləği:
                  </span>
                  <span className={styles.order__cart__footer__price}>
                    {formatPrice(+formatFromPriceToString(totalPrice))} manat
                  </span>
                </div>
                <button
                  className={styles.order__cart__footer__btn}
                  onClick={closeAccordion}
                  disabled={!shoppingCart.length}
                >
                  Mən tamamilə razıyam
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OrderAccordion
