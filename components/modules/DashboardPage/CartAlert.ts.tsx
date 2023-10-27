import Link from 'next/link'
import { useStore } from 'effector-react'
import { ICartAlertProps } from '@/types/dashboard'
import { $mode } from '@/context/mode'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/dashboard/index.module.scss'

const BrandsSlider = ({ count, closeAlert }: ICartAlertProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  console.log(darkModeClass, count, closeAlert)

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>В корзине {count} товаров</span>
        <span>На сумму {formatPrice(0)}</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" passHref legacyBehavior>
          <a className={styles.dashboard__alert__btn_cart}>перейти в Корзину</a>
        </Link>
        <Link href="/order" passHref legacyBehavior>
          <a className={styles.dashboard__alert__btn_order}>оформить заказ</a>
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
