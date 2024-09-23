import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { postOtherOrders } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'
import OrderTableList from '@/components/modules/OrdersPage/OrderTableList'
import { IOrderItem } from '@/types/order'

import styles from '@/styles/order/their/index.module.scss'
import Spinner from '@/components/modules/Spinner/Spinner'

const TheirOrderPage: React.FC = () => {
  const { username, id } = useStore($user)
  const { userIdStorage, usernameStorage } = getLocalStorageUser()
  const barnUserId = +id || +userIdStorage
  const barnUsername = username || usernameStorage

  const [loading, setLoading] = useState(false)

  const [theirOrder, setTheirOrder] = useState<IOrderItem[]>([])

  useEffect(() => {
    const loadMyOrders = async () => {
      setLoading(true)
      const MyOrdersData = await postOtherOrders({
        barnUsername,
        barnUserId,
      })

      if (MyOrdersData?.orders) {
        setTheirOrder(MyOrdersData.orders)
        setLoading(false)
      } else {
        setLoading(false)
        setTheirOrder([])
      }
    }

    loadMyOrders()
  }, [barnUserId, barnUsername])

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersContainer}>
        {loading ? (
          <Spinner loadingText="yüklənir" />
        ) : (
          <OrderTableList orders={theirOrder} type="barnUser" />
        )}
      </div>
    </div>
  )
}

export default TheirOrderPage
