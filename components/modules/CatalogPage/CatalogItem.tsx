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
  const imageUrl = JSON.parse(item.images)[0]

  const spinner = useStore(removeFromCartFx.pending)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const shoppingCart = useStore($shoppingCart)
  const user = useStore($user)
  const isInCart = shoppingCart.some((cart) => cart?.partId === item?.id)

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  const itemsq = {
    // ... ваш объект данных, включая createdAt
    createdAt: {
      type: 'Buffer',
      data: item.createdAt.data,
    },
  }

  // Преобразовываем массив байтов в строку
  const createdAtString = Buffer.from(itemsq.createdAt.data).toString()

  // Создаем объект Date
  const createdAtDate = new Date(createdAtString)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Image
        src={imageUrl}
        alt={item.name}
        width={200}
        height={200}
        priority={true}
      />
      <div className={styles.catalog__list__item__inner}>
        id: {item.id}
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <a target="_blank">
            <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
          </a>
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
          stock: {item.in_stock === 0 ? 'yoxdur' : item.in_stock}
        </span>
        <span className={styles.catalog__list__item__code}>
          yaranma tarixi:
          <br />
          <br />
          {formatDateTime(`${createdAtDate}`)}
        </span>
        <span className={styles.catalog__list__item__code}>
          son yenilənmə tarixi:
          <br />
          <br />
          {formatDateTime(item.updatedAt)}
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
        {item.in_stock === 0 ? (
          <div style={{ height: 40 }} />
        ) : (
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
              <span>
                {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
              </span>
            )}
          </button>
        )}
      </div>
    </li>
  )
}

export default CatologItem
