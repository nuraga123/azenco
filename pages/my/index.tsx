/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import Link from 'next/link'

import { getBarnByUserId } from '@/app/api/barn'
import Layout from '@/components/layout/Layout'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'
import { IBarnResponse } from '@/types/barn'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.css'
import '@/styles/globals.css'

const MyAnbar = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(false)

  const [barn, setBarn] = useState<IBarnResponse>({
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
        <h1 className={styles.barn__title}>Anbardar: {username}</h1>

        <div className={styles.container}>
          <Link href={'/my/barn'} passHref legacyBehavior>
            <button className={`${styles.btn} ${styles.add}`}>Anbar mallari</button>
          </Link>
          <Link href={'/my/lost-barn'} passHref legacyBehavior>
            <button className={`${styles.btn} ${styles.delete}`}>
              Anbar İtirilmiş mallari
            </button>
          </Link>
        </div>
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
