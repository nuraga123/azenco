import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'

import Layout from '@/components/layout/Layout'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'

import '@/styles/globals.css'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { getHistoryAll } from '@/app/api/history'

const History = () => {
  interface IHistoryElement {
    id: number
    message: string
    createdAt: string
    updatedAt: string
    userId: number
    username: string
  }

  const { shouldLoadContent } = useRedirectByUserCheck()
  const [loading, setLoading] = useState(true)
  const [historyData, setHistoryData] = useState<IHistoryElement[]>([])

  // Получаем ID пользователя
  const { id, username } = useStore($user)
  const { userIdStorage } = getLocalStorageUser()
  const userIdResult = id || userIdStorage || 0

  useEffect(() => {
    if (userIdResult) setLoading(false)

    const loadHistoryData = async () => {
      const data = await getHistoryAll()

      setHistoryData(data)
    }

    loadHistoryData()
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
      <div>arxiv</div>
      {historyData.length &&
        historyData.map((el, index) => <li key={index}>{el.message}</li>)}
    </Layout>
  )
}

export default History
