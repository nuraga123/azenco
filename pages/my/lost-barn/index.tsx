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
import styles from '@/styles/barn/index.module.scss'
import '@/styles/globals.css'
import LostBarnTable from '@/components/modules/Barn/Table/LostBarnTable'

const MyLostBarn = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const [loading, setLoading] = useState(true)

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
        <div>
          <Link href="/my">{'geri'}</Link>
        </div>
        <h1 className={styles.barn__title}>
          Mənim itirilmiş Anbarım: {username}
        </h1>
      </div>

      <div className={styles.barn__wrapper_table}>
        <LostBarnTable barn={barn} isLost={true} />
      </div>
    </Layout>
  )
}

export default MyLostBarn
