import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { getAnbarOneFx } from '@/app/api/anbar'
import { AnbarProductProps } from '@/types/anbar'
import styles from '@/styles/anbar/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { setTransfer } from '@/context/transfer'
import { useStore } from 'effector-react'
import { $user } from '@/context/user'
import { numberMetricFormat } from '@/utils/anbar'

const AnbarItem = ({ userId }: { userId: string | number }) => {
  const user = useStore($user)
  console.log(user)

  const [spinner, setSpinner] = useState(false)
  const [anbar, setAnbar] = useState<AnbarProductProps[]>([])

  useEffect(() => {
    const getAnbarServer = async () => {
      try {
        setSpinner(true)
        const data = await getAnbarOneFx(`anbar/${userId}`)
        console.log(data)
        if (data) {
          setAnbar(data)
        }
      } catch (error) {
        console.log((error as Error).message)
      } finally {
        setSpinner(false)
      }
    }

    getAnbarServer()
  }, [userId])

  const handleOrderClick = (item: AnbarProductProps) => {
    if (!!item) {
      setTransfer({
        fromUserId: item.userId ? +item.userId : 0,
        fromUsername: item.username ? item.username : '',
        toUserId: +user.userId ? +user.userId : 0,
        toUsername: user.username ? user.username : '',
        product: item,
      })
    }
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
    >
      <h2 style={{ letterSpacing: 2 }}>
        {`${anbar.length && anbar[0].username?.toUpperCase()}`}
      </h2>

      {spinner ? (
        <div className={spinnerStyles.spinner} />
      ) : (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>_</th>
                <th>№</th>
                <th>azenco kodu</th>
                <th>Adı</th>
                <th>Növü</th>
                <th>ölçü vahidi</th>
                <th>Qiymət</th>
                <th>Miqdar</th>
                <th>Ümumi Qiymət</th>
                <th>Sifariş statusu</th>
                <th>Sifariş miqdarından əvvəl</th>
                <th>Sifarişdən əvvəl Ümumi Qiymət</th>
                <th>Anbar ID</th>
              </tr>
            </thead>
            <tbody>
              {anbar.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        width: '100px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Link href={'/anbar/transfer-form'}>
                        <button onClick={() => handleOrderClick(item)}>
                          заказать
                        </button>
                      </Link>
                    </div>
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {`${index + 1}) `}
                  </td>

                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.azenco__code}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.name}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.type}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.unit}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {numberMetricFormat(item.price)}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {numberMetricFormat(item.stock)}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {numberMetricFormat(item.total_price)}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.ordered
                      ? `sifariş verilib`
                      : 'sifariş etməyə hazırdır'}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {numberMetricFormat(item.previous_stock)}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {numberMetricFormat(item.previous_total_price)}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AnbarItem
