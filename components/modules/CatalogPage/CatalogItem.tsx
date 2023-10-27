import Link from 'next/link'
import Image from 'next/image'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { IBoilerPart } from '@/types/boilerparts'
import { useState } from 'react'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { formatDateTime } from '@/utils/formatDateTime'

const CatologItem = ({ item }: { item: IBoilerPart }) => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const shoppingCart = useStore($shoppingCart)
  const IsInCart = shoppingCart.some((cart) => cart.partId === item.id)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Image
        src={JSON.parse(item.images)[0]}
        alt={item.name}
        width={225}
        height={184}
        priority
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Code: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__code}>
          Code: {item.in_stock}
        </span>
        <span className={styles.catalog__list__item__code}>
          Code: {item.in_stock}
        </span>
        <span className={styles.catalog__list__item__code}>
          Code: {item.in_stock}
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
          onClick={() => setSpinner(true)}
          className={`${styles.catalog__list__item__cart} ${
            IsInCart ? styles.added : ''
          }`}
        >
          {spinner ? (
            <div
              className={skeletonStyles.spinner}
              style={{ top: 5, left: 5 }}
            />
          ) : (
            <span>{IsInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
          )}
        </button>
      </div>
    </li>
  )
}

export default CatologItem
