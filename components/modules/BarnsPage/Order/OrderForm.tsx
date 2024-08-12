import React from 'react'
import styles from '@/styles/barn/order/index.module.scss'

interface Props {
  newStock: string
  usedStock: string
  brokenStock: string
  handleNewStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUsedStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBrokenStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isDisabled: boolean
}

const OrderForm: React.FC<Props> = ({
  newStock,
  usedStock,
  brokenStock,
  handleNewStockChange,
  handleUsedStockChange,
  handleBrokenStockChange,
  handleOrderSubmit,
  isDisabled,
}) => (
  <form className={styles.form} onSubmit={handleOrderSubmit}>
    <div className={styles.formGroup}>
      <label htmlFor="newStock">Yeni miqdarı:</label>
      <input
        type="text"
        id="newStock"
        value={newStock}
        onChange={handleNewStockChange}
      />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="usedStock">İşlənmiş miqdarı:</label>
      <input
        type="text"
        id="usedStock"
        value={usedStock}
        onChange={handleUsedStockChange}
      />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="brokenStock">Yararsız miqdarı:</label>
      <input
        type="text"
        id="brokenStock"
        value={brokenStock}
        onChange={handleBrokenStockChange}
      />
    </div>
    <button type="submit" disabled={isDisabled}>
      Sifarişi təsdiqlə
    </button>
  </form>
)

export default OrderForm
