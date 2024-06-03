import React from 'react'
import styles from '@/styles/anbar/add_form.module.scss'
import { IProduct } from '@/types/products'

interface ModalProps {
  isOpen: boolean
  username: string
  quantity: string
  product: IProduct
  onClose: () => void
  onSubmit: () => void
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setQuantity: React.Dispatch<React.SetStateAction<string>>
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  product,
  username,
  setUsername,
  quantity,
  setQuantity,
  onSubmit,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>

        <h2>Materialın əlavə edilməsi</h2>
        <p>
          Material ID: <b>{product.id}</b>
        </p>
        <p>
          Material adı: <b>{product.name}</b>
        </p>
        <p>
          Material azenco kodu:
          <b>{product.azencoСode}</b>
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Anbardarın adını daxil edin"
          className={styles.modal__input}
        />
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Materialın miqdarını daxil edin"
          className={styles.modal__input}
        />
        <div className={styles.modal__cont}>
          <div>
            <button className={styles.modal__btn} onClick={onSubmit}>
              Anbara əlavə edin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
