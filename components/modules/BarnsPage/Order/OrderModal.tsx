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
  barnUsername,
}) => {
  console.log('')

  return (
    <div>
      {toggleModal && currentBarn ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h1>Sifariş Forması</h1>
              <h2>{`Anbardar: ${barnUsername}`}</h2>

              <button
                type="button"
                onClick={closeBtn}
                className={styles.btn__close}
              >
                <GrClose className={styles.icon} />
              </button>
            </div>
            <div className={styles.wrapper}>
              <ReduceMaterial
                barn={currentBarn}
                newStockDynamic={+newStock}
                usedStockDynamic={+usedStock}
                brokenStockDynamic={+brokenStock}
              />

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
