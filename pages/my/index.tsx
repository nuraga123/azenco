/* eslint-disable @next/next/no-img-element */
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
  const [image, setImage] = useState(false)

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

  const toggleImage = () => setImage(!image)

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
        <h1>Anbardar: {username}</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.title__main} colSpan={5}>
                Əsas
              </th>

              <th className={styles.title__main} colSpan={4}>
                Malların miqdarı
              </th>

              <th className={styles.title__main} colSpan={4}>
                Malların məbləğ
              </th>

              <th className={styles.title__main} colSpan={4}>
                İtirilmiş miqdarı
              </th>

              <th className={styles.title__main} colSpan={4}>
                İtirilmiş məbləğ
              </th>

              <th className={styles.title__main} colSpan={5}>
                Əlavə
              </th>
            </tr>
            <tr>
              {/* Əsas */}
              <th className={styles.title}>ID</th>
              <th className={styles.title}>Azenco Kodu</th>
              <th className={styles.title}>Materialın Adı</th>
              <th className={styles.title}>Vahid</th>
              <th className={styles.title}>Qiymət</th>

              {/* Əsas miqdar */}
              <th className={styles.title}>Yeni</th>
              <th className={styles.title}>İstifadə olunmuş</th>
              <th className={styles.title}>Yararsız</th>
              <th className={styles.title}>Ümumi</th>

              {/* Əsas məbləğ */}
              <th className={styles.title}>Yeni</th>
              <th className={styles.title}>İstifadə olunmuş</th>
              <th className={styles.title}>Yararsız</th>
              <th className={styles.title}>Ümumi</th>

              {/* İtirilmiş miqdarı */}
              <th className={styles.title}>Yeni</th>
              <th className={styles.title}>İstifadə olunmuş</th>
              <th className={styles.title}>Yararsız</th>
              <th className={styles.title}>Ümumi</th>

              {/* İtirilmiş məbləğ */}
              <th className={styles.title}>Yeni</th>
              <th className={styles.title}>İstifadə olunmuş</th>
              <th className={styles.title}>Yararsız</th>
              <th className={styles.title}>Ümumi</th>

              {/* Əlavə */}
              <th className={styles.title}>Növ</th>
              <th className={styles.title}>Yer</th>
              <th className={styles.title}>Şəkil</th>
              <th className={styles.title}>Yaradılma tarixi</th>
              <th className={styles.title}>Yenilənib</th>
            </tr>
          </thead>

          <tbody>
            {barn.barns.map((el, index) => (
              <tr key={index}>
                {/* Əsas */}
                <td>{+el.id}</td>
                <td>{el.azencoCode}</td>
                <td>{el.name}</td>
                <td>{el.unit}</td>
                <td>{el.price}</td>

                {/* Əsas miqdar */}
                <td>{el.newStock}</td>
                <td>{el.usedStock}</td>
                <td>{el.brokenStock}</td>
                <td>{el.totalStock}</td>

                {/* Əsas məbləğ */}
                <td>{el.newTotalPrice}</td>
                <td>{el.usedTotalPrice}</td>
                <td>{el.brokenTotalPrice}</td>
                <td>{el.totalPrice}</td>

                {/* İtirilmiş miqdarı */}
                <td>{el.lostNewStock}</td>
                <td>{el.lostUsedStock}</td>
                <td>{el.brokenTotalPrice}</td>
                <td>{el.lostTotalStock}</td>

                {/* İtirilmiş məbləğ  */}
                <td>{el.lostNewTotalPrice}</td>
                <td>{el.lostUsedTotalPrice}</td>
                <td>{el.lostBrokenTotalPrice}</td>
                <td>{el.lostTotalPrice}</td>

                {/* Əlavə */}
                <td>{el.type}</td>
                <td>{el.location}</td>
                <td>
                  <button className={styles.btn__open} onClick={toggleImage}>
                    {!image && 'Şəkilı göstər'}
                  </button>
                  {image && (
                    <div className={styles.wrapper__image}>
                      <img
                        className={styles.image}
                        src={el.img}
                        alt={el.name}
                      />
                      <button
                        className={styles.btn__close}
                        onClick={toggleImage}
                      >
                        {image && 'X'}
                      </button>
                    </div>
                  )}
                </td>
                <td>{el.createdAt.substr(0, 19).replace('T', ' ')}</td>
                <td>{el.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
