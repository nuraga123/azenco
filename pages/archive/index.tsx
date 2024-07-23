import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'

import '@/styles/globals.css'
import styles from '@/styles/archive/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { getHistoryAll } from '@/app/api/history'

const Archive = () => {
  interface IArchiveElement {
    id: number
    barnId: number
    userId: number
    username: string
    userSelectedDate: string
    movementType: string
    fromLocation: string
    toLocation: string
    message: string
    productName: string
    azencoCode: string
    unit: string
    price: string
    newStock: string
    usedStock: string
    brokenStock: string
    totalStock: string
    lostNewStock: string
    lostUsedStock: string
    lostBrokenStock: string
    lostTotalStock: string
    driverName: string | null
    carNumber: string | null
    createdAt: string
    updatedAt: string
  }

  const router = useRouter()

  const { shouldLoadContent } = useRedirectByUserCheck()
  const [loading, setLoading] = useState(true)
  const [archiveData, setArchiveData] = useState<IArchiveElement[]>([])

  const { id, username } = useStore($user)
  const { userIdStorage } = getLocalStorageUser()
  const userIdResult = id || userIdStorage || 0

  useEffect(() => {
    if (userIdResult) setLoading(false)

    const loadHistoryData = async () => {
      const data = await getHistoryAll()
      setArchiveData(data)
    }

    loadHistoryData()
  }, [userIdResult])

  if (loading || !shouldLoadContent) {
    return (
      <Layout title={`Anbar | ${username}`}>
        <div
          className={spinnerStyles.spinner}
          style={{ width: '100px', height: '100px', top: '40%' }}
        />
      </Layout>
    )
  }

  return (
    <Layout title={`Anbar | ${username}`}>
      <div className={styles.archive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>İstifadəçi adı</th>
              <th>Hərəkət növü</th>
              <th>Mesaj</th>
              <th>İstifadəçinin seçdiyi tarix</th>
              <th>польный просмотр</th>
            </tr>
          </thead>
          <tbody>
            {archiveData.length ? (
              archiveData.map((el) => (
                <tr key={el.id}>
                  <td>{el.username}</td>
                  <td>{el.movementType}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{el.message}</td>
                  <td>{el.userSelectedDate}</td>
                  <td>
                    <button onClick={() => router.push(`/${[el.id]}`)}>
                      смотреть
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={25}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Archive
