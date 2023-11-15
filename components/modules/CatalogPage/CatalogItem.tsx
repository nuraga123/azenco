import { useStore } from 'effector-react'
import Link from 'next/link'
import Image from 'next/image'
import { IBoilerPart } from '@/types/boilerparts'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'

import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'

import { formatPrice } from '@/utils/common'
import { formatDateTime } from '@/utils/formatDateTime'

import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { $user } from '@/context/user'
import { toggleCartItem } from '@/utils/shopping-cart'
import { removeFromCartFx } from '@/app/api/shopping-cart'

const CatologItem = ({ item }: { item: IBoilerPart }) => {
  const spinner = useStore(removeFromCartFx.pending)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const shoppingCart = useStore($shoppingCart)
  const user = useStore($user)
  const isInCart = shoppingCart.some((cart) => cart?.partId === item?.id)

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Image
        src={JSON.parse(item.images)[0]}
        alt={item.name}
        width={225}
        height={184}
        priority
      />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Code: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__code}>
          Производитель: {item.boiler_manufacturer}
        </span>
        <span className={styles.catalog__list__item__code}>
          Запчасть: {item.parts_manufacturer}
        </span>
        <span className={styles.catalog__list__item__code}>
          stock: {item.in_stock}
        </span>
        <span className={styles.catalog__list__item__code}>
          son tarix: {formatDateTime(item.updatedAt)}
        </span>
        <span className={styles.catalog__list__item__price}>Qiymət:</span>
        <br />
        <br />
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} manat
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '10px 6px 0px',
        }}
      >
        <button
          onClick={toggleToCart}
          className={`${styles.catalog__list__item__cart} ${
            isInCart ? styles.added : ''
          }`}
          disabled={spinner}
        >
          {spinner ? (
            <div
              className={spinnerStyles.spinner}
              style={{ top: 70, left: 80, width: 70, height: 70 }}
            />
          ) : (
            <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
          )}
        </button>
      </div>
    </li>
  )
}

export default CatologItem
