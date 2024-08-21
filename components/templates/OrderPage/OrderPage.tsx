import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { getOrders } from '@/app/api/order'
import { $user } from '@/context/user'
import { IOrders } from '@/types/order'
import OrderTable from '@/components/modules/OrderPage/OrderTable'
import BackBtn from '@/components/elements/btn/BackBtn'

import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const user = useStore($user)
  const router = useRouter()
  console.log(user, router)

  const [ordersData, setOrdersData] = useState<IOrders>({
    orders: [],
    error_message: '',
  })

  useEffect(() => {
    const loadOrdersData = async () => {
      const { orders, error_message } = await getOrders()
      if (error_message) toast.warning(error_message)
      if (orders) setOrdersData({ orders })
    }

    loadOrdersData()
  }, [ordersData])

  const testOrders = ordersData?.orders

  return (
    <section className={styles.order}>
      <br />
      <BackBtn />
      <br />
      <div className={styles.container}>
        <h2 className={styles.order__title}>Sifarişlər</h2>
        <div>
          <button onClick={() => router.push('')}>zzz</button>
        </div>
      </div>

      <div>
        {testOrders?.length ? (
          <OrderTable orders={testOrders} />
        ) : (
          <h1>Sifariş siyahısı boşdur...</h1>
        )}
      </div>
    </section>
  )
}

export default OrderPage
