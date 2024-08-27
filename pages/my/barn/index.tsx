import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import { getBarnByUserId } from '@/app/api/barn'
import Layout from '@/components/layout/Layout'
import BarnTable from '@/components/modules/Barn/Table/BarnTable'
import BackBtn from '@/components/elements/btn/BackBtn'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { getLocalStorageUser } from '@/localStorageUser'
import { IBarnResponse } from '@/types/barn'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.scss'
import '@/styles/globals.css'

const MyBarn = () => {
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

        if (data.message === `Нетy Амбаров !`) {
          toast.warning('Material yoxdur')
          return
        } else {
          setBarn({ ...data })
          return
        }
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
      <div className={styles.barn__table}>
        <BackBtn />
        <h1 className={styles.barn__title}>Anbardar: {username}</h1>
      </div>

      {barn?.barns?.length ? (
        <div className={styles.barn__wrapper_table}>
          <BarnTable barn={barn} />
        </div>
      ) : (
        'Material yoxdur'
      )}
    </Layout>
  )
}

export default MyBarn
