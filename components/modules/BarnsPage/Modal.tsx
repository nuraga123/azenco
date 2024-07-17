import { useStore } from 'effector-react'
import React, { useState } from 'react'

import { createAnbarProductFx } from '@/app/api/barn'
import { $user } from '@/context/user'
import { IUser } from '@/types/user'
import { IProduct } from '@/types/products'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/barn/form/add/index.module.scss'
import { toast } from 'react-toastify'

interface ModalProps {
  isOpen: boolean
  product: IProduct | null
  onClose: () => void
}

const BarnModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const user: IUser = useStore($user)
  const { id, username } = user
  const userId = id || getLocalStorageUser().userIdStorage
  const barnUsername: string = username || getLocalStorageUser().usernameStorage
  const [location, setLocation] = useState<string>('')
  const [newStock, setNewStock] = useState<string>('')
  const [usedStock, setUsedStock] = useState<string>('')
  const [brokenStock, setBrokenStock] = useState<string>('')
  const totalStock = +brokenStock + +usedStock + +newStock

  const createNewBarn = async () => {
    console.log('Функция createNewBarn вызвана') // Добавлен вывод в консоль
    console.log(`product ${product?.azencoCode}`)
    console.log(`id ${id}`)
    console.log(`location ${location}`)
    console.log(`totalStock ${totalStock}`)

    if (product && id && location && totalStock) {
      try {
        console.log('Все необходимые данные присутствуют')
        const newBarn = await createAnbarProductFx({
          userId: +userId,
          productId: product.id,
          location: location,
          newStock: +newStock,
          usedStock: +usedStock,
          brokenStock: +brokenStock,
        })

        console.log(newBarn)
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.warning('Некоторые данные отсутствуют') // Добавлен вывод в консоль
    }
  }

  // const validate: boolean = !location || totalStock <= 0

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
          <p>
            Anbardar: <b>{barnUsername}</b>
          </p>
        </div>

        <div>
          <p>
            Material Ad: <b>{product?.name}</b>
          </p>
        </div>

        <div>
          <p>
            Ölçü vahidi: <b>{product?.unit}</b>
          </p>
        </div>

        <div>
          <p>
            Qiymət: <b>{product?.price}</b> m.
          </p>
        </div>

        <div>
          <label>Material hardadır ?</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="ünvanı yazın"
            className={styles.modal__input}
          />
        </div>
        <div>
          <label>Yeni Materialın Miqdarı</label>
          <input
            type="text"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            placeholder="Yeni materialın miqdarını daxil edin"
            className={styles.modal__input}
          />
        </div>
        <div>
          <label>İşlənmiş Materialın Miqdarı</label>
          <input
            type="text"
            value={usedStock}
            onChange={(e) => setUsedStock(e.target.value)}
            placeholder="İstifadə olunan materialın miqdarını daxil edin"
            className={styles.modal__input}
          />
        </div>
        <div>
          <label>Yararsız Materialın Miqdarı</label>
          <input
            type="text"
            value={brokenStock}
            onChange={(e) => setBrokenStock(e.target.value)}
            placeholder="Sınıq materialın miqdarını daxil edin"
            className={styles.modal__input}
          />
        </div>
        <div>
          <br />
          <label>
            {`Ümumi Materialın Miqdarı: `}
            <b style={{ fontSize: 20 }}>{totalStock}</b>
          </label>
        </div>
        <div className={styles.modal__cont}>
          <div>
            <button className={styles.modal__btn} onClick={createNewBarn}>
              Anbara əlavə edin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarnModal
