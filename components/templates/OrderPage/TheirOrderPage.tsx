import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { getMyOrders } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/order/my/index.module.scss'

interface Order {
  id: number
  status: string
  clientId: number
  clientUserName: string
  clientMessage: string
  barnUsername: string
  barnUserId: number
  BarnUserMessage: string
  barnId: number
  productName: string
  azencoCode: string
  newStock: string
  usedStock: string
  brokenStock: string
  totalStock: string
  lostNewStock: string
  lostUsedStock: string
  lostBrokenStock: string
  lostTotalStock: string
  price: string
  totalPrice: string
  unit: string
  barnLocation: string
  clientLocation: string
  driverName: string
  carNumber: string
  info: string
  productId: number
  createdAt: string
  updatedAt: string
}

const MyOrdersPage: React.FC = () => {
  const { username, id } = useStore($user)
  const { userIdStorage, usernameStorage } = getLocalStorageUser()
  const clientId = +id || +userIdStorage
  const clientUserName = username || usernameStorage

  const [myOrders, setMyOrders] = useState<Order[]>([])

  useEffect(() => {
    const loadMyOrders = async () => {
      const MyOrdersData = await getMyOrders({ clientId, clientUserName })
      setMyOrders(MyOrdersData.orders || [])
    }

    loadMyOrders()
  }, [clientId, clientUserName])

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.pageTitle}>My Orders</h1>
      <div className={styles.ordersContainer}>
        {myOrders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <h2 className={styles.orderTitle}>{order.info}</h2>
            <p className={styles.orderInfo}>
              <strong>Status:</strong> {order.status}
            </p>
            <p className={styles.orderInfo}>
              <strong>Client:</strong> {order.clientUserName} ({'ID: '}
              {order.clientId})
            </p>
            <p className={styles.orderInfo}>
              <strong>Barn User:</strong> {order.barnUsername} ({'ID: '}
              {order.barnUserId})
            </p>
            <p className={styles.orderInfo}>
              <strong>Location:</strong> {order.barnLocation}
            </p>
            <p className={styles.orderInfo}>
              <strong>Total Stock:</strong> {order.totalStock} {order.unit}
            </p>
            <p className={styles.orderInfo}>
              <strong>Price:</strong> {order.price} AZN
            </p>
            <p className={styles.orderInfo}>
              <strong>Total Price:</strong> {order.totalPrice} AZN
            </p>
            <p className={styles.orderInfo}>
              <strong>product name: {order.productName}</strong>
            </p>
            <p className={styles.orderDate}>
              <strong>Created At:</strong>{' '}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrdersPage
