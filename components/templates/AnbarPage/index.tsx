import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'

import AnbarImg from '@/public/img/garage-icon.jpg'
import { getAnbarsUsernameFx } from '@/app/api/anbar'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/anbar/index.module.scss'

const AnbarPage = () => {
  const { username } = useStore($user)
  const { usernameStorage } = getLocalStorageUser()
  const [spinner, setSpinner] = useState<boolean>(false)
  const [anbars, setAnbars] = useState<[{ username: string; userId: number }]>([
    { username: '', userId: 0 },
  ])

  const adminCheckUsername: boolean =
    process.env.NEXT_PUBLIC_ADMIN_NAME === username ||
    process.env.NEXT_PUBLIC_ADMIN_NAME === usernameStorage

  useEffect(() => {
    const getAnbarServer = async () => {
      try {
        setSpinner(true)
        const { usernamesArray } = await getAnbarsUsernameFx()
        if (usernamesArray) setAnbars(usernamesArray)
      } catch (error) {
        console.log((error as Error).message)
      } finally {
        setSpinner(false)
      }
    }

    getAnbarServer()
  }, [])

  return (
    <div className={styles.anbar}>
      <h1 className={styles.title}>Anbar Səhifəsi</h1>
      {adminCheckUsername && (
        <div>
          <Link href={`anbars/add-form`} passHref legacyBehavior>
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
        ) : anbars ? (
          anbars.map((el, index) => (
            <Link
              key={index}
              href={`/anbars/user-id/${el.userId}`}
              passHref
              legacyBehavior
            >
              <a className={styles.anbar__item}>
                <div className={styles.container}>
                  <Image src={AnbarImg.src} alt="d" width={50} height={35} />
                  <div>
                    {`${index + 1}) Anbar: `} <b>{el.username}</b>
                  </div>
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
