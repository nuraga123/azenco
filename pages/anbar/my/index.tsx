import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'

import Layout from '@/components/layout/Layout'
import AnbarItem from '@/components/modules/AnbarPage/AnbarItem'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'
import '@/styles/globals.css'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const MyAnbar = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const [loading, setLoading] = useState(true)

  // Получаем ID пользователя
  const { userId, username } = useStore($user)
  const { userIdStorage } = getLocalStorageUser()
  const userIdResult = userId || userIdStorage || 0

  useEffect(() => {
    if (userIdResult) setLoading(false)
  }, [userIdResult])

  // Отображаем спиннер, если происходит загрузка
  // или контент не должен загружаться
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

  // Отображаем компонент AnbarItem только когда загрузка завершена
  // и контент должен загружаться
  return (
    <Layout title={`Anbar | ${username}`}>
      <AnbarItem userId={userId} tableActions={false} />
    </Layout>
  )
}

export default MyAnbar
