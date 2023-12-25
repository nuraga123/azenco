import Image from 'next/image'
import Link from 'next/link'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { usePrice } from '@/hooks/usePrice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { formatPrice } from '@/utils/common'
import { formatFromPriceToString } from '@/utils/shopping-cart'
import { IOrderItem } from '@/types/order'
import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderItem = ({ item, index }: IOrderItem) => {
  const isMedia1160 = useMediaQuery(1160)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice({
      count: item.count,
      partId: item.partId,
      initialPrice: item.price,
    })

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  priority={true}
                />
              </a>
            </Link>
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a
              className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
            >
              <span>{`${index}) ${item.name}`}</span>
            </a>
          </Link>
        </div>
        <span
          style={{ marginTop: 5 }}
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          Qiymət: <b>{`${item.price}`}</b>
        </span>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <div>
              <span className={styles.order__cart__list__item__empty}>
                Нет на складе
              </span>
            </div>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 && (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}

        <span
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(+formatFromPriceToString(price))} manat
        </span>
        <button
          className={`${styles.order__cart__list__item__delete} ${darkModeClass}`}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <span
              className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            <DeleteSvg />
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem
