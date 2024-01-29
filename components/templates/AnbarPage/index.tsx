/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import AnbarImg from '@/public/img/garage-icon.jpg'
import { AnbarProductProps } from '@/types/anbar'
import { getAnbarsFx } from '@/app/api/anbar'
import { useRouter } from 'next/router'
import styles from '@/styles/anbar/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const AnbarPage = () => {
  const router = useRouter()
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

  const pathname = router.pathname
  const getDataAnbarOne = async (userId: number | string) => {
    router.push(`/${pathname}/${userId}`)
  }

  useEffect(() => {
    getAnbarServer()
  }, [])

  console.log(anbars)

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
            <button
              key={index}
              className={styles.anbar__item}
              style={{ cursor: 'pointer' }}
              onClick={() => getDataAnbarOne(el.id)}
            >
              <div className={styles.container}>
                <img src={AnbarImg.src} alt="d" width={50} height={35} />
                {`${index + 1}) ${el.username} Anbar`}
              </div>
            </button>
          ))
        ) : (
          <h3 className={styles.title}>{'Anbar Siyahısı Boşdur...'}</h3>
        )}
      </div>
    </div>
  )
}

export default AnbarPage
