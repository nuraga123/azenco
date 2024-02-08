import React, { useEffect, useState } from 'react'
import { AnbarProductProps } from '@/types/anbar'
import { getAnbarOneFx } from '@/app/api/anbar'
import styles from '@/styles/anbar/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const AnbarItem = ({ userId }: { userId: string | number }) => {
  const [spinner, setSpinner] = useState(false)
  const [anbar, setAnbar] = useState<AnbarProductProps[]>([])

  const getAnbarServer = async () => {
    try {
      setSpinner(true)
      const data = await getAnbarOneFx(`anbar/${userId}`)
      if (data) {
        setAnbar(data)
      }
    } catch (error) {
      console.log((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  console.log(
    anbar.map((el) =>
      Intl.NumberFormat().format(Number(el.total_price || 0) + 100)
    )
  )

  useEffect(() => {
    getAnbarServer()
  }, [userId])

  return (
    <div>
      {spinner ? (
        <div className={spinnerStyles.spinner} />
      ) : (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>azenco kodu</th>
                <th>Adı</th>
                <th>Növü</th>
                <th>ölçü vahidi</th>
                <th>Qiymət</th>
                <th>miqdar</th>
                <th>Ümumi Qiymət</th>
                <th>sifariş</th>
                <th>miqdar sifariş etməzdən əvvəl</th>
                <th>Ümumi Qiymət sifariş etməzdən əvvəl</th>
              </tr>
            </thead>
            <tbody>
              {anbar.map((item, index) => (
                <tr key={index}>
                  <td className={item.ordered ? styles.ordered : ''}>{`${
                    index + 1
                  }) `}</td>
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
                    {item.price}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.stock}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.total_price}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.ordered
                      ? `sifariş verilib`
                      : 'sifariş etməyə hazırdır'}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.previous_stock}
                  </td>
                  <td className={item.ordered ? styles.ordered : ''}>
                    {item.previous_total_price}
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
