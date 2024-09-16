import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import { getArchiveAll } from '@/app/api/archive'
import Layout from '@/components/layout/Layout'
import Spinner from '@/components/modules/Spinner/Spinner'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'

import styles from '@/styles/archive/index.module.scss'

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
      <Layout title={`Anbar | Arxiv`}>
        <div className={styles.wrapper__load}>
          <Spinner
            widthPX={100}
            heightPX={100}
            top={40}
            left={50}
            loadingText="Arxiv yüklənir"
          />
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Anbar | ${username}`}>
      <div className={styles.archive}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.thead__tr}>
              <th className={styles.thead__th}>№</th>
              <th className={styles.thead__th}>İstifadəçi adı</th>
              <th className={styles.thead__th}>Hərəkət növü</th>
              <th className={styles.thead__th}>Təsviri</th>
              <th className={styles.thead__th}>İstifadəçinin seçdiyi tarix</th>
              <th className={styles.thead__th}>daha ətraflı</th>
            </tr>
          </thead>
          <tbody>
            {archiveData.length ? (
              archiveData.map((el, index) => (
                <tr key={el.id}>
                  <td>{`${index + 1}) `}</td>
                  <td>{el.username}</td>
                  <td>{el.movementType?.replaceAll('_', ' ')}</td>
                  <td className={styles.message}>{el.message}</td>
                  <td>{el.userSelectedDate}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => router.push(`/archive/${[el.id]}`)}
                    >
                      🗃️
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
