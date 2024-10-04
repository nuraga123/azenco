/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { getMyOrders } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/order/my/index.module.scss'
import { IOrderItem } from '@/types/order'
import OrderTableList from '@/components/modules/OrdersPage/OrderTableList'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const MyOrdersPage: React.FC = () => {
  const { username, id } = useStore($user)
  const { userIdStorage, usernameStorage } = getLocalStorageUser()
  const clientId = +id || +userIdStorage
  const clientUserName = username || usernameStorage

  const [myOrders, setMyOrders] = useState<IOrderItem[]>([])

  const loadMyOrders = async () => {
    try {
      const MyOrdersData = await getMyOrders({ clientId, clientUserName })
      setMyOrders(MyOrdersData.orders)
    } catch (error) {
      const error_message = (error as AxiosError)?.message
      toast.error(`Failed to load orders:  ${error_message}`)
    }
  }

  useEffect(() => {
    loadMyOrders()
  }, [clientId, clientUserName])

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersContainer}>
        <OrderTableList
          orders={myOrders}
          type="clientUser"
          onRefresh={loadMyOrders}
        />
      </div>
    </div>
  )
}

export default MyOrdersPage
