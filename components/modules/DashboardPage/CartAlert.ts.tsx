import Link from 'next/link'
import { useStore } from 'effector-react'
import { ICartAlertProps } from '@/types/dashboard'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import { $totalPrice } from '@/context/shopping-cart'

const BrandsSlider = ({ count, closeAlert }: ICartAlertProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const totalPrice = useStore($totalPrice)

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>Səbətdə {count} məhsul</span>
        <span>На сумму {formatFromPriceToString(totalPrice)} manat</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" passHref legacyBehavior>
          <a className={styles.dashboard__alert__btn_cart}>перейти в Корзину</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}

export default BrandsSlider
