import Image from 'next/image'
import Link from 'next/link'
import { useStore } from 'effector-react'
import { usePrice } from '@/hooks/usePrice'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '@/types/shopping-cart'

import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

interface ICartPopupItemProps {
  item: IShoppingCartItem
  index: number
}

const CartPopupItem = ({ item, index }: ICartPopupItemProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''

  const { spinner, deleteCartItem } = usePrice({
    count: item.count,
    partId: item.partId,
    initialPrice: item.price,
  })

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
              {`${index}) ${item?.name}`}
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
        qiymet: {item.price}
        anbar Adi: {item.userId}
      </div>
    </li>
  )
}

export default CartPopupItem
