import { useStore } from 'effector-react'
import Link from 'next/link'
import Image from 'next/image'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { IBoilerPart } from '@/types/boilerparts'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import { $user } from '@/context/user'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import {
  CatalogCodeComponent,
  CatalogNameComponent,
  CatalogTextComponent,
} from '@/components/elements/CatalogTextComponent'
import { formatPrice } from '@/utils/common'
import { formatDateTime } from '@/utils/formatDateTime'
import { toggleCartItem } from '@/utils/shopping-cart'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CatologItem = ({ item }: { item: IBoilerPart }) => {
  const imageUrl = JSON.parse(item.images)[0]

  const spinner = useStore(removeFromCartFx.pending)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const shoppingCart = useStore($shoppingCart)
  const user = useStore($user)
  const isInCart = shoppingCart.some((cart) => cart?.partId === item?.id)

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  // Преобразовываем массив байтов в строку
  const createdAtString = item.createdAt

  const showUpdatedAt: boolean =
    formatDateTime(`${createdAtString}`) !== formatDateTime(`${item.updatedAt}`)

  console.log(`${formatPrice(item.price)}`.replace('.00', ''))

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
        <CatalogTextComponent keyText={'ID'} item={item.id} />

        {/* product name */}
        <CatalogNameComponent item={item} />

        {/* product code */}
        <CatalogCodeComponent item={item} />

        <CatalogTextComponent
          keyText={'Ölçü vahidləri'}
          item={item.bestseller === false ? 'Ədəd ' : 'Metr'}
        />

        <CatalogTextComponent
          keyText={'Migdar'}
          item={
            item.in_stock === 0 ? (
              <span style={{ color: 'red' }}>yoxdur</span>
            ) : (
              item.in_stock
            )
          }
        />

        <CatalogTextComponent
          keyText={'Yaranma tarixi'}
          item={formatDateTime(`${createdAtString}`)}
          flex={true}
        />

        {showUpdatedAt && (
          <CatalogTextComponent
            keyText={'Son yenilənmə tarixi'}
            item={formatDateTime(`${item.updatedAt}`)}
            flex={true}
          />
        )}

        <CatalogTextComponent
          keyText={'Qiymət'}
          item={`${formatPrice(item.price)} manat`}
          flex={true}
        />
      </div>

      {/* Cart Check btn   */}
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
