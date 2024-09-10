import { useState } from 'react'
import { IBarnItem, IBarnResponse } from '@/types/barn'
import BarnTableHead from './BarnTableHead'
import ModalBtn from '../ModalBtn'
import { $setFind_barns } from '@/context/find_barns'

import styles from '@/styles/barn/table/index.module.scss'

const BarnTable = ({ barn }: { barn: IBarnResponse }) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedBarnId, setSelectedBarnId] = useState<number>(0)

  const handleSelectModal = (id: number) => {
    setOpenModal(true)
    setSelectedBarnId(id)

    const currentBarn = barn?.barns?.filter((el) => +el?.id === +id)
    console.log('currentBarn')
    console.log(currentBarn)
    const { productId, azencoCode, productName } = currentBarn[0]

    $setFind_barns({
      productId,
      azencoCode,
      productName,
      deleteName: '',
    })
  }

  const handleCloseModal = () => setOpenModal(false)

  return (
    <div>
      <table className={styles.table}>
        <BarnTableHead />

        <tbody>
          {barn?.barns?.map((el: IBarnItem, index: number) => (
            <tr key={index}>
              <td colSpan={3}>
                <button
                  onClick={() => handleSelectModal(+el?.id)}
                  className={styles.btn}
                />
              </td>

              <td>{el.id}</td>
              <td>{el.azencoCode}</td>
              <td className={styles.name}>{el.productName}</td>
              <td>{el.unit}</td>
              <td className={styles.name}>{+el.price}</td>
              <td>{+el.newStock}</td>
              <td>{+el.usedStock}</td>
              <td>{+el.brokenStock}</td>
              <td className={styles.name}>{+el.totalStock}</td>
              <td>{+el.newTotalPrice}</td>
              <td>{+el.usedTotalPrice}</td>
              <td>{+el.brokenTotalPrice}</td>
              <td className={styles.name}>{+el.totalPrice}</td>
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

      {openModal && (
        <ModalBtn
          selectedBarnId={selectedBarnId}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default BarnTable
