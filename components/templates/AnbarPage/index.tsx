import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'

import AnbarImg from '@/public/img/garage-icon.jpg'
import { getAnbarsFx } from '@/app/api/anbar'
import { $user } from '@/context/user'
import { IAnbarProductProps } from '@/types/anbar'
import { getLocalStorageUser } from '@/localStorageUser'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/anbar/index.module.scss'

const AnbarPage = () => {
  const { username } = useStore($user)
  const { usernameStorage } = getLocalStorageUser()
  const [spinner, setSpinner] = useState<boolean>(false)
  const [anbars, setAnbars] = useState<IAnbarProductProps[]>([])

  const adminCheckUsername: boolean =
    process.env.NEXT_PUBLIC_ADMIN_NAME === username ||
    process.env.NEXT_PUBLIC_ADMIN_NAME === usernameStorage

  const getAnbarServer = async () => {
    try {
      setSpinner(true)
      const data = (await getAnbarsFx(`anbar/all`)) as IAnbarProductProps[]
      if (data) {
        setAnbars(data)
      }
    } catch (error) {
      console.log((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    getAnbarServer()
  }, [])

  const filterUsernameAnbarList = anbars.reduce(
    (unique: IAnbarProductProps[], item) => {
      const existingItem = unique.find(
        (user) => user.username === item.username
      )
      if (!existingItem) {
        unique.push(item)
      }
      return unique
    },
    []
  )

  console.log('filterUsernameAnbarList')
  console.log(filterUsernameAnbarList)

  return (
    <div className={styles.anbar}>
      <h1 className={styles.title}>Anbar Səhifəsi</h1>
      {adminCheckUsername && (
        <div>
          <Link href={`anbar/add-form`} passHref legacyBehavior>
            <a className={styles.add__form}>Создать Анбар</a>
          </Link>
        </div>
      )}
      <div className={styles.anbar__items}>
        {spinner ? (
          <div
            className={spinnerStyles.spinner}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              background: 'gray',
            }}
          />
        ) : anbars.length ? (
          filterUsernameAnbarList.map((el, index) => (
            <Link
              key={index}
              href={`/anbar/${el.userId}`}
              passHref
              legacyBehavior
            >
              <a className={styles.anbar__item}>
                <div className={styles.container}>
                  <Image src={AnbarImg.src} alt="d" width={50} height={35} />
                  <div>{`${index + 1}) ${el.username} Anbar`}</div>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <h3 className={styles.title}>{'Anbar Siyahısı Boşdur...'}</h3>
        )}
      </div>
    </div>
  )
}

export default AnbarPage
