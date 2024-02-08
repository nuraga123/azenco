import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnbarImg from '@/public/img/garage-icon.jpg'
import { AnbarProductProps } from '@/types/anbar'
import { getAnbarsFx } from '@/app/api/anbar'
import styles from '@/styles/anbar/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const AnbarPage = () => {
  const [spinner, setSpinner] = useState(false)
  const [anbars, setAnbars] = useState<AnbarProductProps[]>([])

  const getAnbarServer = async () => {
    try {
      setSpinner(true)
      const data = (await getAnbarsFx(`anbar/all`)) as AnbarProductProps[]
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

  return (
    <div className={styles.anbar}>
      <h1 className={styles.title}>Anbar Səhifəsi</h1>

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
          anbars.map((el, index) => (
            <Link key={index} href={`/anbar/${el.id}`} passHref legacyBehavior>
              <a className={styles.anbar__item}>
                <div className={styles.container}>
                  <Image src={AnbarImg.src} alt="d" width={50} height={35} />
                  {`${index + 1}) ${el.username} Anbar`}
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
