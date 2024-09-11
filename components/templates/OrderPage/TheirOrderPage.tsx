import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { postOtherOrders } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'
import OrderTableList from '@/components/modules/OrdersPage/OrderTableList'
import { IOrderItem } from '@/types/order'

import styles from '@/styles/order/their/index.module.scss'

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

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersContainer}>
        <OrderTableList orders={theirOrder} type="barnUser" />
      </div>
    </div>
  )
}

export default TheirOrderPage
