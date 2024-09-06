import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { getMyOrders } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/order/my/index.module.scss'
import { IOrderItem } from '@/types/order'
import OrderTableList from '@/components/modules/OrdersPage/OrderTableList'

const MyOrdersPage: React.FC = () => {
  const { username, id } = useStore($user)
  const { userIdStorage, usernameStorage } = getLocalStorageUser()
  const clientId = +id || +userIdStorage
  const clientUserName = username || usernameStorage

  const [myOrders, setMyOrders] = useState<IOrderItem[]>([])

  useEffect(() => {
    const loadMyOrders = async () => {
      const MyOrdersData = await getMyOrders({ clientId, clientUserName })
      setMyOrders(MyOrdersData.orders || [])
    }

    loadMyOrders()
  }, [clientId, clientUserName])

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersContainer}>
        <OrderTableList orders={myOrders} type="clientUser" />
      </div>
    </div>
  )
}

export default MyOrdersPage
