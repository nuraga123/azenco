import React, { useState } from 'react'
import { IBarnItem } from '@/types/barn'
//import Image from 'next/image'

import styles from '@/styles/barn/material/index.module.scss'

const MaterialComponent = ({ barn }: { barn: IBarnItem }) => {
  const [showDetails, setShowDetails] = useState(true)

  const {
    id,
    productName,
    type,
    unit,
    location,
    newStock,
    usedStock,
    brokenStock,
    totalStock,
    price,
    newTotalPrice,
    usedTotalPrice,
    brokenTotalPrice,
    totalPrice,
    createdAt,
    updatedAt,
    username,
    azencoCode,
  } = barn

  return (
    <div className={styles.material}>
      <div className={styles.material__switch}>
        <button
          onClick={() => setShowDetails(true)}
          className={showDetails ? styles.active : ''}
        >
          Xüsusiyyətlər
        </button>
        <button
          onClick={() => setShowDetails(false)}
          className={!showDetails ? styles.active : ''}
        >
          Hesablamalar
        </button>
      </div>
      {showDetails ? (
        <div className={styles.material__details}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>ID</th>
                <td>
                  <b>
                    <i>{id}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Azenco Kodu</th>
                <td>
                  <b>
                    <i>{azencoCode}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Adı</th>
                <td>
                  <b>
                    <i>{productName}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Növü</th>
                <td>
                  <b>
                    <i>{type}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Ölçü vahidi</th>
                <td>
                  <b>
                    <i>{unit}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Qiymət</th>
                <td>
                  <b>
                    <i>{price}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Yaradılma tarixi</th>
                <td>
                  <b>
                    <i>{createdAt}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Yenilənmə tarixi</th>
                <td>
                  <b>
                    <i>{updatedAt}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Yer</th>
                <td>
                  <b>
                    <i>{location}</i>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <div className={styles.material__image}>
            <Image src={img} alt={productName} width={200} height={200} />
          </div> */}
        </div>
      ) : (
        <div className={styles.material__calculations}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Yeni stok</th>
                <td>
                  <b>
                    <i>{newStock}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>İstifadə olunmuş stok</th>
                <td>
                  <b>
                    <i>{usedStock}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Zədələnmiş stok</th>
                <td>
                  <b>
                    <i>{brokenStock}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Ümumi stok</th>
                <td>
                  <b>
                    <i>{totalStock}</i>
                  </b>
                </td>
              </tr>

              <tr>
                <th>Yeni stokun ümumi qiyməti</th>
                <td>
                  <b>
                    <i>{newTotalPrice}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>İstifadə olunmuş stokun ümumi qiyməti</th>
                <td>
                  <b>
                    <i>{usedTotalPrice}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Zədələnmiş stokun ümumi qiyməti</th>
                <td>
                  <b>
                    <i>{brokenTotalPrice}</i>
                  </b>
                </td>
              </tr>
              <tr>
                <th>Ümumi qiymət</th>
                <td>
                  <b>
                    <i>{totalPrice}</i>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MaterialComponent
