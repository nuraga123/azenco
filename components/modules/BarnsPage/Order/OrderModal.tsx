import React from 'react'
import { GrClose } from 'react-icons/gr'
import styles from '@/styles/barn/order/index.module.scss'
import OrderForm from './OrderForm'
import { IBarnItem } from '@/types/barn'

interface Props {
  orderBarn: IBarnItem | null
  toggleModal: boolean
  setToggleModal: (value: boolean) => void
  handleOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  newStock: string
  usedStock: string
  brokenStock: string
  handleNewStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUsedStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBrokenStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled: boolean
}

const OrderModal: React.FC<Props> = ({
  orderBarn,
  toggleModal,
  setToggleModal,
  handleOrderSubmit,
  newStock,
  usedStock,
  brokenStock,
  handleNewStockChange,
  handleUsedStockChange,
  handleBrokenStockChange,
  isDisabled,
}) =>
  toggleModal &&
  orderBarn && (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1>Sifariş Forması</h1>
          <button type="button" onClick={() => setToggleModal(false)}>
            <GrClose className={styles.icon} />
          </button>
        </div>
        <div className={styles.wrapper}>
          <main className={styles.main}>
            <div className={styles.row}>
              <div className={styles.key}>Azenco Kodu:</div>
              <div className={styles.value}>{orderBarn.azencoCode}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.key}>Məhsulun adı:</div>
              <div className={styles.value}>
                <b>{orderBarn.productName}</b>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.key}>Yeni miqdarı:</div>
              <div className={styles.value}>
                {+orderBarn.newStock === 0 ? 'yoxdur' : +orderBarn.newStock}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.key}>İşlənmiş miqdarı:</div>
              <div className={styles.value}>
                {+orderBarn.usedStock === 0 ? 'yoxdur' : +orderBarn.usedStock}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.key}>Yararsız miqdarı:</div>
              <div className={styles.value}>
                {+orderBarn.brokenStock === 0
                  ? 'yoxdur'
                  : +orderBarn.brokenStock}
              </div>
            </div>
          </main>
          <OrderForm
            newStock={newStock}
            usedStock={usedStock}
            brokenStock={brokenStock}
            handleNewStockChange={handleNewStockChange}
            handleUsedStockChange={handleUsedStockChange}
            handleBrokenStockChange={handleBrokenStockChange}
            handleOrderSubmit={handleOrderSubmit}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  )

export default OrderModal
