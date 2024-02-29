import React from 'react'
import styles from '@/styles/anbar/add_form.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  product: { name: string; id: number }
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  onSubmit: () => void
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
        <h2>Добавление товара</h2>
        <p>Имя продукта: {product.name}</p>
        <p>ID продукта: {product.id}</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите имя пользователя"
          className={styles.modal__input}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          placeholder="Введите количество товара"
          className={styles.modal__input}
        />
        <div className={styles.modal__cont}>
          <div>
            <button className={styles.modal__btn} onClick={onSubmit}>
              Добавить на склад
            </button>
          </div>
          <div>
            <span className={styles.close} onClick={onClose}>
              &times;
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
