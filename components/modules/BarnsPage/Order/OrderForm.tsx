import React from 'react'
import { IOrderBase } from '@/types/order'

import styles from '@/styles/barn/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderForm: React.FC<IOrderBase> = ({
  newStock,
  usedStock,
  brokenStock,
  clientMessage,
  clientLocation,
  handleCLientLocationChange,
  handleClientMessageChange,
  handleNewStockChange,
  handleUsedStockChange,
  handleBrokenStockChange,
  handleOrderSubmit,
  isDisabled,
  spinner,
  errorsMessageArr,
}) => {
  const errors = (arr: string[]) =>
    arr.map((el) => (
      <h5 className={styles.err} key={el.length}>
        {el}
      </h5>
    ))

  //
  const err = errorsMessageArr?.length ? errors(errorsMessageArr) : ''

  return (
    <form className={styles.form} onSubmit={handleOrderSubmit}>
      {err}
      <div className={styles.formGroup}>
        <label htmlFor="newStock">Yeni miqdarı</label>
        <input
          type="text"
          id="newStock"
          value={newStock}
          onChange={handleNewStockChange}
          autoComplete="off"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="usedStock">İşlənmiş miqdarı</label>
        <input
          type="text"
          id="usedStock"
          value={usedStock}
          onChange={handleUsedStockChange}
          autoComplete="off"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="brokenStock">Yararsız miqdarı</label>
        <input
          type="text"
          id="brokenStock"
          value={brokenStock}
          onChange={handleBrokenStockChange}
          autoComplete="off"
        />
      </div>
      <div className={styles.formGroup__long}>
        <label htmlFor="clientMessage">
          {`Sifariş tələbləriniz varsa yazın...`}
          <p>{`(Yoxdursa, heç nə yazmayın)`}</p>
        </label>

        <input
          type="text"
          id="clientMessage"
          value={clientMessage}
          onChange={handleClientMessageChange}
        />
      </div>
      <div className={styles.formGroup__long}>
        <label htmlFor="clientLocation">
          Hara sifariş vermək istəyirsiz ?{` (ünvan)`}
        </label>
        <input
          type="text"
          id="clientLocation"
          value={clientLocation}
          onChange={handleCLientLocationChange}
        />
      </div>
      <button type="submit" disabled={isDisabled} className={styles.btn}>
        {spinner ? <div className={spinnerStyles.spinner} /> : 'Sifarişi edin'}
      </button>
    </form>
  )
}

export default OrderForm
