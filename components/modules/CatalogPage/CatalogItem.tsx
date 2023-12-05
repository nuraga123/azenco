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
import { ReactNode } from 'react'

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

  const showUpdatedAt: boolean =
    formatDateTime(`${createdAtDate}`) !== formatDateTime(`${item.updatedAt}`)

  const TextComponent = ({
    keyText,
    item,
    flex,
  }: {
    keyText: string
    flex: boolean
    item: string | number | boolean | ReactNode
  }) => (
    <span className={styles.catalog__list__item__code}>
      {flex ? (
        <div style={{ marginBottom: '5px' }}>{keyText}:</div>
      ) : (
        keyText + ': '
      )}
      <b style={{ letterSpacing: '1px', color: 'black' }}>{item}</b>
    </span>
  )

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image
            src={imageUrl}
            alt={item.name}
            width={200}
            height={200}
            priority={true}
          />
        </a>
      </Link>
      <div className={styles.catalog__list__item__inner}>
        <TextComponent keyText={'ID'} item={item.id} flex={false} />
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <a target="_blank">
            <TextComponent keyText={'AD'} item={item.name} flex={true} />
          </a>
        </Link>
        <TextComponent keyText={'Code'} item={item.vendor_code} flex={false} />

        <TextComponent
          keyText={'Migdar'}
          item={
            item.in_stock === 0 ? (
              <span style={{ color: 'red' }}>yoxdur</span>
            ) : (
              item.in_stock
            )
          }
          flex={false}
        />

        <TextComponent
          keyText={'Ölçü vahidləri'}
          item={item.bestseller === false ? 'Ədəd ' : 'Metr'}
          flex={false}
        />

        <TextComponent
          keyText={'Yaranma tarixi'}
          item={formatDateTime(`${createdAtDate}`)}
          flex={true}
        />

        {showUpdatedAt && (
          <TextComponent
            keyText={'Son yenilənmə tarixi'}
            item={formatDateTime(`${item.updatedAt}`)}
            flex={true}
          />
        )}

        <TextComponent
          keyText={'Qiymət'}
          item={`${formatPrice(item.price)} manat`}
          flex={true}
        />
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
