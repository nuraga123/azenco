import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { getAnbarOneFx } from '@/app/api/anbar'
import { IAnbarProductProps } from '@/types/anbar'
import { setTransfer } from '@/context/transfer'
import { $user } from '@/context/user'
import { numberMetricFormat } from '@/utils/anbar'
import { getLocalStorageAnbar, setLocalStorageAnbar } from '@/localStorageAnbar'

import styles from '@/styles/anbar/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const AnbarItem = ({ userId }: { userId: string | number }) => {
  const { id, username } = useStore($user)
  const [spinner, setSpinner] = useState(false)
  const [anbar, setAnbar] = useState<IAnbarProductProps[]>([])

  const tableActions = Boolean(+id !== +userId)
  console.log('tableActions')
  console.log(tableActions, id, userId)

  useEffect(() => {
    const getAnbarServer = async () => {
      setSpinner(true)
      try {
        const data: IAnbarProductProps[] = await getAnbarOneFx(
          `anbar/user-id/${userId}`
        )

        if (data.length) {
          setAnbar(data)
        } else {
          setAnbar([])
        }
      } catch (error) {
        toast.error((error as Error).message)
        console.log((error as Error).message)
      } finally {
        setSpinner(false)
      }
    }

    getAnbarServer()
  }, [userId])

  const handleOrderClick = (item: IAnbarProductProps) => {
    if (item && item.userId && username) {
      const transferData = {
        fromUserId: +item.userId,
        toUserId: id,
        fromUsername: item.username,
        toUsername: username,
        product: item,
      }

      setTransfer(transferData)

      setLocalStorageAnbar(JSON.stringify(transferData))
    }
  }

  const resulting = getLocalStorageAnbar()

  console.log(JSON.parse(`${resulting}`))

  return (
    <div>
      {spinner ? (
        <div className={spinnerStyles.spinner} />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <h2 style={{ letterSpacing: 2 }}>
            {`${anbar.length && anbar[0].username?.toUpperCase()}`}
          </h2>

          <div className={styles.container}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {tableActions && <th>_</th>}
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
                {anbar.map((item: IAnbarProductProps, index: number) => (
                  <tr key={index}>
                    {tableActions && (
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
                    )}
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
                      {Intl.NumberFormat().format(Number(item.price))}
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
        </div>
      )}
    </div>
  )
}

export default AnbarItem
