import { IoIosAddCircle } from 'react-icons/io'
import { GrSubtractCircle } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'
import Link from 'next/link'

import { IBarnItem, IBarnResponse } from '@/types/barn'
import BarnTableHead from './BarnTableHead'
import styles from '@/styles/barn/table/index.module.scss'

const BarnTable = ({ barn }: { barn: IBarnResponse }) => (
  <div>
    <h1 className={styles.table_title}>Anbar materiallari</h1>
    <table className={styles.table}>
      <BarnTableHead />

      <tbody>
        {barn?.barns?.map((el: IBarnItem, index: number) => (
          <tr key={index}>
            {/* Əsas */}
            <td style={{ padding: '5px 31px' }}>
              <Link href={`/my/barn/add/${+el?.id}`} passHref legacyBehavior>
                <IoIosAddCircle
                  className={styles.icon__plus}
                  onClick={(e) => console.log(e.target)}
                />
              </Link>
            </td>

            <td style={{ padding: '5px 36px' }}>
              <Link href={`/my/barn/reduce/${+el?.id}`} passHref legacyBehavior>
                <GrSubtractCircle
                  className={styles.icon__minus}
                  onClick={(e) => console.log(e.target)}
                />
              </Link>
            </td>

            <td style={{ padding: '11px 26px' }}>
              <Link href={`/my/barn/delete/${+el?.id}`} passHref legacyBehavior>
                <MdDeleteForever
                  className={styles.icon__delete}
                  onClick={(e) => console.log(e.target)}
                />
              </Link>
            </td>

            {/* Əsas */}
            <td>{el.id}</td>
            <td>{el.azencoCode}</td>
            <td className={styles.name}>{el.productName}</td>
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
            <td>{el.location}</td>
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

export default BarnTable
