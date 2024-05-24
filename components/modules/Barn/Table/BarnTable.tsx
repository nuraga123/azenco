/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { GrSubtractCircle } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'
import { AiFillPicture } from 'react-icons/ai'
import { IoMdCloseCircleOutline } from 'react-icons/io'

import { IBarnItem, IBarnResponse } from '@/types/barn'
import styles from '@/styles/barn/table/index.module.scss'
import '@/styles/globals.css'

const BarnTable = ({ barn }: { barn: IBarnResponse }) => {
  const [image, setImage] = useState<boolean>(false)

  const toggleImage = () => setImage(!image)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.title__main} colSpan={3}>
            Əməliyyatlar
          </th>

          <th className={styles.title__main} colSpan={5}>
            Material haqqında
          </th>

          <th className={styles.title__main} colSpan={4}>
            Materialın miqdarı
          </th>

          <th className={styles.title__main} colSpan={4}>
            Malların məbləğı
          </th>

          <th className={styles.title__main} colSpan={5}>
            Əlavə material məlumatları
          </th>
        </tr>
        <tr>
          {/* Əməliyyatlar */}
          <th className={styles.title}>artırmaq</th>
          <th className={styles.title}>azaltmaq</th>
          <th className={styles.title}>silinmə</th>

          {/* Əsas */}
          <th className={styles.title}>ID</th>
          <th className={styles.title}>Azenco Kodu</th>
          <th className={styles.title}>Materialın Adı</th>
          <th className={styles.title}>Vahid</th>
          <th className={styles.title}>Qiymət</th>

          {/* Əsas miqdar */}
          <th className={styles.title}>Yeni</th>
          <th className={styles.title}>Yararli</th>
          <th className={styles.title}>Yararsız</th>
          <th className={styles.title}>Ümumi</th>

          {/* Əsas məbləğ */}
          <th className={styles.title}>Yeni</th>
          <th className={styles.title}>Yararli</th>
          <th className={styles.title}>Yararsız</th>
          <th className={styles.title}>Ümumi</th>

          {/* Əlavə */}
          <th className={styles.title}>Növ</th>
          <th className={styles.title}>Yer</th>
          <th className={styles.title}>Şəkil</th>
          <th className={styles.title}>Yaradılma tarixi</th>
          <th className={styles.title}>Yenilənib</th>
        </tr>
      </thead>

      <tbody>
        {barn?.barns?.map((el: IBarnItem, index: number) => (
          <tr key={index}>
            {/* Əsas */}
            <td style={{ padding: '5px 31px' }}>
              <IoIosAddCircle
                className={styles.icon__plus}
                onClick={(e) => console.log(e.target)}
              />
            </td>

            <td style={{ padding: '5px 36px' }}>
              <GrSubtractCircle
                className={styles.icon__minus}
                onClick={(e) => console.log(e.target)}
              />
            </td>

            <td style={{ padding: '11px 26px' }}>
              <MdDeleteForever
                className={styles.icon__delete}
                onClick={(e) => console.log(e.target)}
              />
            </td>

            <td>{el.id}</td>
            <td>{el.azencoCode}</td>
            <td className={styles.name}>{el.name}</td>
            <td>{el.unit}</td>
            <td className={styles.name}>{+el.price}</td>

            {/* Əsas miqdar */}
            <td>{+el.newStock}</td>
            <td>{+el.usedStock}</td>
            <td>{+el.brokenStock}</td>
            <td className={styles.name}>{+el.totalStock}</td>

            {/* Əsas məbləğ */}
            <td>{+el.newTotalPrice}</td>
            <td>{+el.usedTotalPrice}</td>
            <td>{+el.brokenTotalPrice}</td>
            <td className={styles.name}>{+el.totalPrice}</td>

            {/* Əlavə */}
            <td>{el.type}</td>

            <td>{el.location}</td>

            <td>
              {!image && (
                <AiFillPicture
                  className={styles.icon__image}
                  onClick={toggleImage}
                />
              )}

              {image && (
                <div className={styles.wrapper__image}>
                  <img className={styles.image} src={el.img} alt={el.name} />
                  {image && (
                    <IoMdCloseCircleOutline
                      className={styles.icon__close}
                      onClick={toggleImage}
                    />
                  )}
                </div>
              )}
            </td>

            <td className={styles.date}>
              {el.createdAt.substr(0, 16).replace('T', ' ')}
            </td>

            <td className={styles.date}>
              {el.updatedAt.substr(0, 16).replace('T', ' ')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BarnTable
