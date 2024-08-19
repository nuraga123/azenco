import { IoIosAddCircle } from 'react-icons/io'
import { GrSubtractCircle } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IBarnItem, IBarnResponse } from '@/types/barn'
import BarnTableHead from './BarnTableHead'

import styles from '@/styles/barn/table/index.module.scss'
import stylesModal from '@/styles/modal/index.module.scss'

const BarnTable = ({ barn }: { barn: IBarnResponse }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [selectedBarnId, setSelectedBarnId] = useState<number | null>(null)
  const [modalType, setModalType] = useState(false)

  const handleOpenModal = (type: boolean, barnId: number) => {
    setModalType(type)
    setSelectedBarnId(barnId)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedBarnId(null)
  }

  const handleAction = () => {
    if (selectedBarnId !== null) {
      if (modalType) {
        router.push(`/my/barn/add/${selectedBarnId}`)
      } else {
        router.push(`/barns`)
      }
    }

    handleCloseModal()
  }

  return (
    <div>
      <h1 className={styles.table_title}>Anbar materiallari</h1>

      <table className={styles.table}>
        <BarnTableHead />

        <tbody>
          {barn?.barns?.map((el: IBarnItem, index: number) => (
            <tr key={index}>
              <td style={{ padding: '5px 31px' }}>
                <IoIosAddCircle
                  className={styles.icon__plus}
                  onClick={() => handleOpenModal(true, +el.id)}
                />
              </td>

              <td style={{ padding: '5px 36px' }}>
                <GrSubtractCircle
                  className={styles.icon__minus}
                  onClick={() => router.push(`/my/barn/reduce/${+el.id}`)}
                />
              </td>

              <td style={{ padding: '11px 26px' }}>
                <Link
                  href={`/my/barn/delete/${+el?.id}`}
                  passHref
                  legacyBehavior
                >
                  <MdDeleteForever className={styles.icon__delete} />
                </Link>
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
        <div className={stylesModal.modal}>
          <div className={stylesModal.modal_content}>
            <div className={stylesModal.modal_head}>
              <h2 className={stylesModal.modal_title}>Fəaliyyət seçin</h2>

              <button
                className={stylesModal.modal_close}
                onClick={handleCloseModal}
              >
                Bağlayın
              </button>
            </div>

            <div className={stylesModal.modal_head}>
              <button
                className={stylesModal.modal_add}
                onClick={() => handleAction()}
              >
                Xarici mənbədən materialın miqdarının artırılması
              </button>

              <button
                className={stylesModal.modal_transfer}
                onClick={() => handleAction()}
              >
                Başqa anbardan köçürülmə ilə əlaqədar materialın miqdarının
                artırılması
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BarnTable
