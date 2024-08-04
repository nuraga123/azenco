import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { getBarnByUserId } from '@/app/api/barn'
import Layout from '@/components/layout/Layout'
import BarnTable from '@/components/modules/Barn/Table/BarnTable'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'
import { IBarnResponse } from '@/types/barn'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/table/index.module.scss'
import '@/styles/globals.css'

function BanrnUserIdPage() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const router = useRouter()

  const userId = Array.isArray(router.query.userId)
    ? router.query.userId[0]
    : router.query.userId || '0'

  console.log('userId')
  console.log(userId)

  const [loading, setLoading] = useState(true)

  const [barn, setBarn] = useState<IBarnResponse>({
    barns: [],
    message: '',
    error_message: '',
  })

  // Получаем ID пользовате
  const { id, username } = useStore($user)
  const { userIdStorage } = getLocalStorageUser()
  const userIdResult = +id || +userIdStorage || 0
  console.log('userIdResult')
  console.log(userIdResult)

  useEffect(() => {
    const getAnbarServer = async () => {
      setLoading(true)
      try {
        const data = await getBarnByUserId(+userId)
        console.log(data)
        if (data) setBarn({ ...data })
      } catch (error) {
        toast.error((error as Error).message)
        console.log((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    getAnbarServer()
  }, [userId, userIdResult])

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

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Anbar'}>
          <h1 className={styles.barn__title}>Anbardar: {username}</h1>
          {+userId && barn ? (
            <BarnTable barn={barn} />
          ) : (
            <div
              style={{
                margin: '10px auto',
                width: 300,
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h1>Анбар не найден</h1>
              <Link href={'/my'}>
                <button>Вернитесь в свой анбар</button>
              </Link>
            </div>
          )}
        </Layout>
      )}
    </>
  )
}

export default BanrnUserIdPage
