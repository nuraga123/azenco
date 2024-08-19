import React from 'react'
import { GrClose } from 'react-icons/gr'

import { IOrderModal } from '@/types/order'
import ReduceMaterial from '@/components/templates/BarnsPage/MaterialComponent/ReduceMaterial'
import OrderForm from './OrderForm'
import styles from '@/styles/barn/order/index.module.scss'

const OrderModal: React.FC<IOrderModal> = ({
  currentBarn,
  toggleModal,
  closeBtn,
  handleOrderSubmit,
  newStock,
  usedStock,
  brokenStock,
  clientLocation,
  clientMessage,
  handleCLientLocationChange,
  handleClientMessageChange,
  handleNewStockChange,
  handleUsedStockChange,
  handleBrokenStockChange,
  isDisabled,
  spinner,
  errorsMessageArr,
}) => {
  console.log('')

  /*
  const RowComponent = ({
    text,
    values,
  }: {
    text: string
    values: number | string | JSX.Element
  }) => (
    <div className={styles.row}>
      <div className={styles.key}>{text}</div>
      <div className={styles.value}>{values}</div>
    </div>
  )
  */

  return (
    <div>
      {toggleModal && currentBarn ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h1>Sifariş Forması</h1>
              <button
                type="button"
                onClick={closeBtn}
                className={styles.btn__close}
              >
                <GrClose className={styles.icon} />
              </button>
            </div>
            <div className={styles.wrapper}>
              <main className={styles.main}>
                <ReduceMaterial
                  barn={currentBarn}
                  newStockDynamic={+newStock}
                  usedStockDynamic={+usedStock}
                  brokenStockDynamic={+brokenStock}
                />

                {/*
                <RowComponent text="Anbardar: " values={currentBarn.username} />

                <RowComponent
                  text="Məhsulun yeri: "
                  values={currentBarn.location}
                />

                <RowComponent
                  text="Azenco Kodu: "
                  values={currentBarn.azencoCode}
                />

                <RowComponent
                  text="Məhsulun adı: "
                  values={currentBarn.productName}
                />

                <RowComponent
                  text="Yeni miqdarı: "
                  values={
                    <b>
                      {+currentBarn.newStock === 0
                        ? 'yoxdur'
                        : +currentBarn.newStock}
                    </b>
                  }
                />

                <RowComponent
                  text="İşlənmiş miqdarı: "
                  values={
                    <b>
                      {+currentBarn.usedStock === 0
                        ? 'yoxdur'
                        : +currentBarn.usedStock}
                    </b>
                  }
                />

                <RowComponent
                  text="Yararsız miqdarı: "
                  values={
                    <b>
                      {+currentBarn.brokenStock === 0
                        ? 'yoxdur'
                        : +currentBarn.brokenStock}
                    </b>
                  }
                />

                <RowComponent
                  text="Ümümi miqdarı: "
                  values={+currentBarn.totalStock}
                />

                <RowComponent text="ölçü vahidi: " values={currentBarn.unit} />

                <RowComponent text="Qiymət: " values={+currentBarn.price} />
              */}
              </main>

              <OrderForm
                errorsMessageArr={errorsMessageArr}
                spinner={spinner}
                newStock={newStock}
                usedStock={usedStock}
                brokenStock={brokenStock}
                handleNewStockChange={handleNewStockChange}
                handleUsedStockChange={handleUsedStockChange}
                handleBrokenStockChange={handleBrokenStockChange}
                handleOrderSubmit={handleOrderSubmit}
                isDisabled={isDisabled}
                clientMessage={clientMessage}
                clientLocation={clientLocation}
                handleCLientLocationChange={handleCLientLocationChange}
                handleClientMessageChange={handleClientMessageChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default OrderModal
