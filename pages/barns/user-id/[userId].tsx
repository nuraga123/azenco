import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { GrClose } from 'react-icons/gr'

import { getBarnByUserId } from '@/app/api/barn'
import Layout from '@/components/layout/Layout'
import BackBtn from '@/components/elements/btn/BackBtn'
import { IBarnItem, IBarnResponse } from '@/types/barn'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/order/index.module.scss'

function BarnUserIdPage() {
  const router = useRouter()
  const userId = Number(router.query.userId) || 0

  const [loading, setLoading] = useState(true)
  const [userBarnsData, setUserBarnsData] = useState<IBarnResponse>({
    barns: [],
    error_message: '',
    message: '',
  })

  const [toggleModal, setToggleModal] = useState(false)
  const [orderBarn, setOrderBarn] = useState<IBarnItem | null>(null)
  const [newStock, setNewStock] = useState('')
  const [usedStock, setUsedStock] = useState('')
  const [brokenStock, setBrokenStock] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

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

  useEffect(() => {
    if (orderBarn) {
      const totalQuantity =
        (+newStock || 0) + (+usedStock || 0) + (+brokenStock || 0)
      setIsDisabled(totalQuantity <= 0)
    }
  }, [newStock, usedStock, brokenStock, orderBarn])

  const handleNewStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0) {
      toast.error('0-dan az ola bilməz')
      return
    }
    if (orderBarn && value > +orderBarn.newStock) {
      toast.error('mövcud ehtiyatı keçir')
      return
    }
    setNewStock(value.toString())
  }

  const handleUsedStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0) {
      toast.error('0-dan az ola bilməz')
      return
    }
    if (orderBarn && value > +orderBarn.usedStock) {
      toast.error('mövcud ehtiyatı keçir')
      return
    }
    setUsedStock(value.toString())
  }

  const handleBrokenStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0) {
      toast.error('0-dan az ola bilməz')
      return
    }
    if (orderBarn && value > +orderBarn.brokenStock) {
      toast.error('mövcud ehtiyatı keçir')
      return
    }
    setBrokenStock(value.toString())
  }

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (orderBarn) {
      const newNewStock = Math.max(+orderBarn.newStock - +newStock, 0)
      const newUsedStock = Math.max(+orderBarn.usedStock - +usedStock, 0)
      const newBrokenStock = Math.max(+orderBarn.brokenStock - +brokenStock, 0)

      setOrderBarn({
        ...orderBarn,
        newStock: `${newNewStock}`,
        usedStock: `${newUsedStock}`,
        brokenStock: `${newBrokenStock}`,
      })

      setToggleModal(false)
      toast.success('Order placed successfully!')
    }
  }

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
                  <button
                    onClick={() => {
                      setOrderBarn(barn)
                      setNewStock('')
                      setUsedStock('')
                      setBrokenStock('')
                      setToggleModal(true)
                    }}
                  >
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

      {toggleModal && orderBarn && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h1>Sifariş Forması</h1>
              <button type="button" onClick={() => setToggleModal(false)}>
                <GrClose className={styles.icon} />
              </button>
            </div>

            <div className={styles.wrapper}>
              <main className={styles.main}>
                <div className={styles.row}>
                  <div className={styles.key}>Azenco Kodu:</div>
                  <div className={styles.value}>{orderBarn?.azencoCode}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>Məhsulun adı:</div>
                  <div className={styles.value}>
                    <b>{orderBarn?.productName}</b>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>Yeni miqdarı:</div>
                  <div className={styles.value}>
                    {+orderBarn?.newStock === 0
                      ? 'yoxdur'
                      : +orderBarn?.newStock}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>İşlənmiş miqdarı:</div>
                  <div className={styles.value}>
                    {+orderBarn?.usedStock === 0
                      ? 'yoxdur'
                      : +orderBarn?.usedStock}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>Yararsız miqdarı:</div>
                  <div className={styles.value}>
                    {+orderBarn?.brokenStock === 0
                      ? 'yoxdur'
                      : +orderBarn?.brokenStock}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>Ümumi miqdar:</div>
                  <div className={styles.value}>
                    <b>{+orderBarn?.totalStock}</b>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>Qiymət:</div>
                  <div className={styles.value}>
                    <b>{+orderBarn?.price}</b>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.key}>Yerləşmə:</div>
                  <div className={styles.value}>{orderBarn?.location}</div>
                </div>
              </main>

              <form onSubmit={handleOrderSubmit}>
                {+orderBarn.newStock > 0 ? (
                  <div>
                    <label>
                      Yeni miqdarı ({+orderBarn.newStock} mövcuddur)
                    </label>
                    <input
                      type="text"
                      value={newStock}
                      onChange={handleNewStockChange}
                      min="0"
                    />
                  </div>
                ) : (
                  <div className={styles.no_stocks}>
                    yeni materiallar yoxdur
                  </div>
                )}

                {+orderBarn.usedStock > 0 ? (
                  <div>
                    <label>
                      İşlənmiş miqdarı ({+orderBarn.usedStock} mövcuddur)
                    </label>
                    <input
                      type="text"
                      value={usedStock}
                      onChange={handleUsedStockChange}
                      min="0"
                    />
                  </div>
                ) : (
                  <div className={styles.no_stocks}>
                    işlənmiş materiallar yoxdur
                  </div>
                )}

                {+orderBarn.brokenStock > 0 ? (
                  <div>
                    <label>
                      Yararsız miqdarı ({+orderBarn.brokenStock} mövcuddur)
                    </label>
                    <input
                      type="text"
                      value={brokenStock}
                      onChange={handleBrokenStockChange}
                      min="0"
                    />
                  </div>
                ) : (
                  <div className={styles.no_stocks}>
                    yararsız materiallar yoxdur
                  </div>
                )}

                <div>
                  <h1>
                    <label>{`Ümumi miqdar: `}</label>
                    {(+newStock || 0) +
                      (+usedStock || 0) +
                      (+brokenStock || 0)}{' '}
                    {orderBarn.unit}
                  </h1>
                </div>
                <button type="submit" disabled={isDisabled}>
                  Sifarişi təsdiqlə
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default BarnUserIdPage
