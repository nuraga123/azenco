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
import { getArchiveAll } from '@/app/api/archive'

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
      const data = await getArchiveAll()
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
              <th>Təsviri</th>
              <th>İstifadəçinin seçdiyi tarix</th>
              <th>
                <span className={styles.icon}>🗃️</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {archiveData.length ? (
              archiveData.map((el) => (
                <tr key={el.id}>
                  <td>{el.username}</td>
                  <td>{el.movementType}</td>
                  <td className={styles.message}>{el.message}</td>
                  <td>{el.userSelectedDate}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => router.push(`/archive/${[el.id]}`)}
                    >
                      daha ətraflı
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
