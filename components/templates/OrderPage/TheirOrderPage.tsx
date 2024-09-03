import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { postOtherOrders, confirmBarnUser, cancelOrderBarnUser } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/order/their/index.module.scss'
import { IOrderItem } from '@/types/order'

const TheirOrderPage: React.FC = () => {
  const { username, id } = useStore($user)
  const { userIdStorage, usernameStorage } = getLocalStorageUser()
  const barnUserId = +id || +userIdStorage
  const barnUsername = username || usernameStorage

  const [theirOrder, setTheirOrder] = useState<IOrderItem[]>([])

  useEffect(() => {
    const loadMyOrders = async () => {
      const MyOrdersData = await postOtherOrders({
        barnUsername,
        barnUserId,
      })
      setTheirOrder(MyOrdersData.orders || [])
    }

    loadMyOrders()
  }, [barnUserId, barnUsername])

  const handleConfirmOrder = async (orderId: number) => {
    await confirmBarnUser({
      orderId,
      barnUserId,
    })
    setTheirOrder(theirOrder.filter((order) => order.id !== orderId))
  }

  const handleCancelOrder = async (orderId: number) => {
    await cancelOrderBarnUser(orderId)
    setTheirOrder(theirOrder.filter((order) => order.id !== orderId))
  }

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.pageTitle}>Подтверждение заказов</h1>
      <div className={styles.ordersContainer}>
        {theirOrder.map((order: IOrderItem) => (
          <div key={order.id} className={styles.orderRow}>
            <span className={styles.orderId}>№ {order.id}</span>
            <span className={styles.client}>
              Клиент: {order.clientUserName}
            </span>
            <span className={styles.clientLocation}>
              Откуда: {order.clientLocation}
            </span>
            <span className={styles.productName}>
              Продукт: {order.productName}
            </span>
            <span className={styles.azencoCode}>Код: {order.azencoCode}</span>
            <span className={styles.stock}>Кол-во: Новые {order.newStock}</span>
            <span className={styles.stock}>
              Кол-во: Старые {order.usedStock}
            </span>
            <span className={styles.stock}>
              Кол-во: Сломанные {order.brokenStock}
            </span>
            <span className={styles.price}>Цена: {order.totalPrice} AZN</span>
            <span className={styles.createdAt}>
              Создан: {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <div className={styles.orderActions}>
              <button
                className={styles.confirmButton}
                onClick={() => handleConfirmOrder(order.id)}
              >
                Подтвердить
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => handleCancelOrder(order.id)}
              >
                Отменить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TheirOrderPage
