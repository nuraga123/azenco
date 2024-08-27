import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import barnImg from '@/public/img/garage-icon.jpg'
import { getBarnsUsernameFx } from '@/app/api/barn'
import BackBtn from '@/components/elements/btn/BackBtn'

import styles from '@/styles/barns/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const BarnsPage = () => {
  const [spinner, setSpinner] = useState<boolean>(false)

  const [barnsUsername, setBarnsUsername] = useState<
    { username: string; userId: number }[]
  >([])

  useEffect(() => {
    const fetchBarnsUsername = async () => {
      setSpinner(true)
      try {
        const { usernames } = await getBarnsUsernameFx()
        if (usernames) setBarnsUsername(usernames)
      } catch (error) {
        console.error('xəta baş verdi: ', error)
      } finally {
        setSpinner(false)
      }
    }

    fetchBarnsUsername()
  }, [])

  return (
    <div className={styles.barns}>
      <div className={styles.head}>
        <BackBtn />
        <h1 className={styles.title}>Anbar Səhifəsi</h1>
      </div>
      <div className={styles.items}>
        {spinner ? (
          <div className={spinnerStyles.spinner} />
        ) : barnsUsername.length ? (
          barnsUsername.map(({ username, userId }) => (
            <Link
              key={userId}
              href={`/barns/user-id/${userId}`}
              passHref
              legacyBehavior
            >
              <a className={styles.item}>
                <div className={styles.item__container}>
                  <Image
                    src={barnImg.src}
                    alt="barn-img"
                    width={50}
                    height={35}
                  />

                  <div>
                    Anbardar: <b>{username}</b>
                  </div>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <h3 className={styles.title}>Anbar Siyahısı Boşdur...</h3>
        )}
      </div>
    </div>
  )
}

export default BarnsPage
