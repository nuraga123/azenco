import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import { getBarnByUserId } from '@/app/api/barn'
import Layout from '@/components/layout/Layout'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.css'
import '@/styles/globals.css'

const MyAnbar = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const [loading, setLoading] = useState(true)
  const [barn, setBarn] = useState<BarnResponse>({
    barns: [],
    message: '',
    error_message: '',
  })

  // Получаем ID пользователя
  const { id, username } = useStore($user)
  const { userIdStorage } = getLocalStorageUser()
  const userIdResult = +id || +userIdStorage || 0

  useEffect(() => {
    const getAnbarServer = async () => {
      setLoading(true)
      try {
        const data = await getBarnByUserId(userIdResult)
        if (data) setBarn({ ...data })
      } catch (error) {
        toast.error((error as Error).message)
        console.log((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    getAnbarServer()
  }, [userIdResult])

  // Отображаем спиннер, если происходит загрузка или контент не должен загружаться
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

  // Отображаем компонент AnbarItem только когда загрузка завершена и контент должен загружаться
  return (
    <Layout title={`Anbar | ${username}`}>
      <div>
        <h1 className={styles.title}>Anbardar: {username}</h1>
        

        {barn.barns.map((el) => (
          <div className={styles.container} key={+el.id}>
            <div className={styles.sablon1}>
              <div className={styles.left__part}>
                <p>
                  Anbar №<h1 className={styles.der}>{el.id}</h1>
                </p>

                <div>
                  <p>
                    Adı: <p>{el.name}</p>
                  </p>
                  <p>Azenco Kodu:</p>
                  <p>{el.azencoCode}</p>
                </div>
              </div>
            </div>
            <div className={styles.sablon2}></div>
            <div className={styles.item}>
              <img className={styles.image} src={el.img} alt={el.name} />
            </div>
            <p>Növ: {el.type}</p>
            <p>Vahid: {el.unit}</p>
            <p>Şəkil: {el.img}</p>
            <p>Yer: {el.location}</p>
            <p>Yeni ehtiyat: {el.newStock}</p>
            <p>İstifadə olunmuş ehtiyat: {el.usedStock}</p>
            <p>Qırılmış səhm: {el.brokenStock}</p>
            <p>Ümumi ehtiyat: {el.totalStock}</p>
            <p>Qiymət: {el.price}</p>
            <p>Yeni Ümumi Qiymət: {el.newTotalPrice}</p>
            <p>İstifadə olunmuş Ümumi Qiymət: {el.usedTotalPrice}</p>
            <p>Sınıq Ümumi Qiymət: {el.brokenTotalPrice}</p>
            <p>Ümumi Qiymət: {el.totalPrice}</p>
            <p>İtirilmiş yeni səhm: {el.lostNewStock}</p>
            <p>İtirilmiş istifadə edilmiş ehtiyat: {el.lostUsedStock}</p>
            <p>İtirilmiş Sınıq Səhm: {el.lostBrokenStock}</p>
            <p>İtirilmiş ümumi ehtiyat: {el.lostTotalStock}</p>
            <p>İtirilmiş Yeni Ümumi Qiymət: {el.lostNewTotalPrice}</p>
            <p>
              İtirilmiş İstifadə olunmuş Ümumi Qiymət: {el.lostUsedTotalPrice}
            </p>
            <p>İtirilmiş Sınıq Ümumi Qiymət: {el.lostBrokenTotalPrice}</p>
            <p>İtirilmiş Ümumi Qiymət: {el.lostTotalPrice}</p>
            <p>Yaradılma tarixi: {el.createdAt}</p>
            <p>Yenilənib: {el.updatedAt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default MyAnbar

/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 1200,
            backgroundColor: '#03a9f466',
            borderRadius: 10,
            padding: '10px 5px',
            margin: 10
          }}
        >
          <div style={{ border: '3px solid green' }}>
            <h1>Anbar № 1</h1>
            <div>
              <div style={{ display: 'flex' }}>
                <div>
                  <p>adi:</p>
                </div>
                <div>
                  <p>zebra</p>
                </div>
              </div>

              <div>
                <p>
                  adi: <h1>zebra</h1>
                </p>
              </div>
            </div>
          </div>

          <div style={{ border: '3px solid red' }}>
            <div>
              <img
                style={{ width: 100 }}
                src="https://uwindi.ru/wp-content/uploads/ambar-case-pic00.webp"
                alt="ddd"
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 1200,
            backgroundColor: '#03a9f466',
            borderRadius: 10,
            padding: '10px 5px',
            margin: 10
          }}
        >
          <div style={{ border: '3px solid green' }}>
            <h1>Anbar № 2</h1>
            <div>
              <div style={{ display: 'flex' }}>
                <div>
                  <p>adi:</p>
                </div>
                <div>
                  <p>zebra</p>
                </div>
              </div>

              <div>
                <p>
                  adi: <h1>zebra</h1>
                </p>
              </div>
            </div>
          </div>

          <div style={{ border: '3px solid red' }}>
            <div>
              <img
                style={{ width: 100 }}
                src="https://uwindi.ru/wp-content/uploads/ambar-case-pic00.webp"
                alt="ddd"
              />
            </div>
          </div>
        </div> */
