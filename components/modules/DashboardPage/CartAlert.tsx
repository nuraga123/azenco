import Link from 'next/link'
import { useStore } from 'effector-react'
import { ICartAlertProps } from '@/types/dashboard'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import { $totalPrice } from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const totalPrice = useStore($totalPrice)

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span style={{ letterSpacing: 2 }}>
          Səbət: <b>{count}</b>
          {' məhsul'}
        </span>
        <span style={{ letterSpacing: 2 }}>
          Məbləğ: <b>{formatPrice(+formatFromPriceToString(totalPrice))}</b>
          {' manat'}
        </span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" passHref legacyBehavior>
          <a
            className={styles.dashboard__alert__btn_order}
            style={{ letterSpacing: 2 }}
          >
            Sifariş Forması
          </a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}

export default CartAlert
