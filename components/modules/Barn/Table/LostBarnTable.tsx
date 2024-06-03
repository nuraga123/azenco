/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { GrSubtractCircle } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'
import { AiFillPicture } from 'react-icons/ai'
import { IoMdCloseCircleOutline } from 'react-icons/io'

import { IBarnItem, IBarnResponse } from '@/types/barn'
import BarnTableHead from './BarnTableHead'
import styles from '@/styles/barn/table/index.module.scss'
import '@/styles/globals.css'

const LostBarnTable = ({
  barn,
  isLost,
}: {
  barn: IBarnResponse
  isLost: boolean
}) => {
  const [image, setImage] = useState<boolean>(false)

  const toggleImage = () => setImage(!image)

  return (
    <div>
      {
        <h1 className={styles.table_title}>
          {isLost ? 'Itirilmiş materiallar' : 'Anbar materiallari'}
        </h1>
      }
      <table className={styles.table}>
        <BarnTableHead />

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
              <td className={styles.name}>{el.productName}</td>
              <td>{el.unit}</td>
              <td className={styles.name}>{+el.price}</td>

              {/* Əsas miqdar */}
              <td>{+el.lostNewStock}</td>
              <td>{+el.lostUsedStock}</td>
              <td>{+el.lostBrokenStock}</td>
              <td className={styles.name}>{+el.lostTotalStock}</td>

              {/* Əsas məbləğ */}
              <td>{+el.lostNewTotalPrice}</td>
              <td>{+el.lostUsedTotalPrice}</td>
              <td>{+el.lostBrokenTotalPrice}</td>
              <td className={styles.name}>{+el.lostTotalPrice}</td>

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
                    <img
                      className={styles.image}
                      src={el.img}
                      alt={el.productName}
                    />
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
    </div>
  )
}

export default LostBarnTable
