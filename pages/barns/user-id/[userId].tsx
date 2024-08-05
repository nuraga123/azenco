import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getBarnByUserId } from '@/app/api/barn'
import Layout from '@/components/layout/Layout'
import BackBtn from '@/components/elements/btn/BackBtn'
import { IBarnItem } from '@/types/barn'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/order/index.module.scss'

function BarnUserIdPage() {
  const router = useRouter()
  const userId = Number(router.query.userId) || 0

  const [loading, setLoading] = useState(true)
  const [userBarnsData, setUserBarnsData] = useState<{
    barns: IBarnItem[]
    error__message: ''
    message: ''
  }>({
    barns: [],
    error__message: '',
    message: '',
  })

  useEffect(() => {
    const fetchBarns = async () => {
      setLoading(true)
      try {
        const data = await getBarnByUserId(userId)
        if (data && data.barns) setUserBarnsData(data)
      } catch (error) {
        toast.error((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchBarns()
  }, [userId])

  if (loading) {
    return (
      <Layout title="Anbar">
        <div
          className={spinnerStyles.spinner}
          style={{ width: '100px', height: '100px', top: '40%' }}
        />
      </Layout>
    )
  }

  return (
    <Layout title="Anbar">
      <BackBtn />
      <h1 className={styles.barn__title}>
        Anbardar:{' '}
        {userBarnsData?.barns?.length > 0
          ? userBarnsData.barns[0]?.username
          : 'yoxdur'}
      </h1>
      {userBarnsData?.barns?.length > 0 ? (
        <table className={styles.barnTable}>
          <thead>
            <tr>
              <th className={styles.wrapper__btn}>Sifariş</th>
              <th className={styles.azencoCode}>Azenco Kodu</th>
              <th className={styles.name}>Məhsulun adı</th>
              <th>Yeni miqdarı</th>
              <th>İşlənmiş miqdarı</th>
              <th>Yararsız miqdarı</th>
              <th>Ümumi miqdar</th>
              <th>Qiymət</th>
              <th>Yerləşmə</th>
            </tr>
          </thead>
          <tbody>
            {userBarnsData?.barns?.map((barn: IBarnItem) => (
              <tr key={barn.id}>
                <td className={styles.wrapper__btn}>
                  <button onClick={() => console.log('Order')}>
                    sifariş edin
                  </button>
                </td>
                <td className={styles.azencoCode}>{barn?.azencoCode}</td>
                <td className={styles.name}>
                  <b>{barn?.productName}</b>
                </td>
                <td>{+barn?.newStock === 0 ? 'yoxdur' : +barn?.newStock}</td>
                <td>{+barn?.usedStock === 0 ? 'yoxdur' : +barn?.usedStock}</td>
                <td>
                  {+barn?.brokenStock === 0 ? 'yoxdur' : +barn?.brokenStock}
                </td>
                <td>
                  <b>{+barn?.totalStock}</b>
                </td>
                <td>
                  <b>{+barn?.price}</b>
                </td>
                <td>{barn?.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Анбар не найден</div>
      )}
    </Layout>
  )
}

export default BarnUserIdPage
