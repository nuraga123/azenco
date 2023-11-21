import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '@/types/shopping-cart'

import Image from 'next/image'
import Link from 'next/link'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
// import { formatPrice } from '@/utils/common'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { formatFromPriceToString } from '@/utils/shopping-cart'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''

  const [spinner, setSpinner] = useState(false)
  const [price, setPrice] = useState<number>(item.price)

  useEffect(() => {
    setPrice(Number(price) * Number(item.count))
  }, [])

  useEffect(() => {
    updateTotalPrice(Number(price), item.partId)
  }, [price])

  function increasePrice() {
    const result = Number(price) + Number(item?.price)
    setPrice(+(+result.toFixed(2)))
  }

  const decreasePrice = () => {
    const result = Number(price) - Number(item?.price)
    setPrice(+(+result.toFixed(2)))
  }

  const deleteCartItem = () => removeItemFromCart(item.partId, setSpinner)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <Image src={item?.image} alt={item?.name} width={200} height={100} />
        </div>
        <Link href={`catalog/${item?.partId}`} passHref legacyBehavior>
          <a>
            <span
              className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
            >
              {item?.name}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem} style={{ padding: '5px' }}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            stokda yoxdur
          </span>
        ) : (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}
        <span className={`${styles.cart__popup__list__price} ${darkModeClass}`}>
          {formatFromPriceToString(price)}
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
