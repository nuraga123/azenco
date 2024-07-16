import React, { useState, useEffect } from 'react'
import { IProduct } from '@/types/products'
import styles from '@/styles/barn/form/add/index.module.scss'
import { createAnbarProductFx } from '@/app/api/barn'
import { IUser } from '@/types/user'
import { getUsersNamesServer } from '@/app/api/auth'

interface ModalProps {
  isOpen: boolean
  product: IProduct | null
  onClose: () => void
}

const BarnModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number>(0)
  const [location, setLocation] = useState<string>('Baku')
  const [newStock, setNewStock] = useState<string>('0')
  const [usedStock, setUsedStock] = useState<string>('0')
  const [brokenStock, setBrokenStock] = useState<string>('0')

  useEffect(() => {
    if (isOpen) {
      loadUsers()
    }
  }, [isOpen])

  const loadUsers = async () => {
    try {
      const dataUser = await getUsersNamesServer()
      setUsers(dataUser)
      console.log(dataUser)
    } catch (error) {
      console.log(error)
    }
  }

  const createNewBarn = async () => {
    if (
      product &&
      selectedUserId &&
      location &&
      newStock &&
      usedStock &&
      brokenStock
    ) {
      try {
        const newBarn = await createAnbarProductFx({
          userId: selectedUserId,
          productId: product.id,
          location: location,
          newStock: parseInt(newStock),
          usedStock: parseInt(usedStock),
          brokenStock: parseInt(brokenStock),
        })
        console.log(newBarn)
        onClose() // Закрываем модальное окно после создания записи
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSubmit = () => {
    createNewBarn()
  }

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
        <div>
          <label>Выбрать складчика</label>
          <select
            onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
            value={selectedUserId}
          >
            <option value={0}>Выберите складчика</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={styles.modal__input}
          />
        </div>
        <div>
          <label>Yeni Materialın Miqdarı</label>
          <input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            placeholder="Yeni materialın miqdarını daxil edin"
            className={styles.modal__input}
          />
        </div>
        <div>
          <label>İstifadə Olunan Materialın Miqdarı</label>
          <input
            type="number"
            value={usedStock}
            onChange={(e) => setUsedStock(e.target.value)}
            placeholder="İstifadə olunan materialın miqdarını daxil edin"
            className={styles.modal__input}
          />
        </div>
        <div>
          <label>Sınıq Materialın Miqdarı</label>
          <input
            type="number"
            value={brokenStock}
            onChange={(e) => setBrokenStock(e.target.value)}
            placeholder="Sınıq materialın miqdarını daxil edin"
            className={styles.modal__input}
          />
        </div>
        <div className={styles.modal__cont}>
          <div>
            <button className={styles.modal__btn} onClick={handleSubmit}>
              Anbara əlavə edin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarnModal
