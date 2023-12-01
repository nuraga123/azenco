import { IShoppingCartItem } from '@/types/shopping-cart'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return ()
}
