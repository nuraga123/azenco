import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { createAnbarProductFx } from '@/app/api/barn'
import { $user } from '@/context/user'
import { IUser } from '@/types/user'
import { IProduct } from '@/types/products'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/barn/form/add/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

interface ModalProps {
  isOpen: boolean
  product: IProduct | null
  onClose: () => void
}

const BarnModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const user: IUser = useStore($user)
  console.log('user')
  console.log(user.id)
  const userId = +user?.id || getLocalStorageUser().userIdStorage
  const barnUsername: string =
    user?.username || getLocalStorageUser().usernameStorage
  const [location, setLocation] = useState<string>('')
  const [newStock, setNewStock] = useState<string>('')
  const [usedStock, setUsedStock] = useState<string>('')
  const [brokenStock, setBrokenStock] = useState<string>('')
  const [spinner, setSpinner] = useState<boolean>(false)
  const totalStock = +brokenStock + +usedStock + +newStock

  const validate: boolean = !location || totalStock <= 0 || isNaN(totalStock)

  const clearData = () => {
    setLocation('')
    setNewStock('')
    setUsedStock('')
    setBrokenStock('')
  }

  const createNewBarn = async () => {
    if (validate) {
      toast.warning('ünvanını yazın və ya məhsulun miqdarını yazın')
      return
    }

    if (product && userId && location && totalStock) {
      try {
        console.log('Все необходимые данные присутствуют')
        setSpinner(true)

        const newBarn = await createAnbarProductFx({
          userId: +userId,
          productId: product.id,
          location: location,
          newStock: +newStock,
          usedStock: +usedStock,
          brokenStock: +brokenStock,
        })

        console.log(newBarn)

        toast.success(newBarn.message)
        return
      } catch (error) {
        toast.error((error as AxiosError).message)
        console.log(error)
        clearData()
        return
      } finally {
        setSpinner(false)
        onClose()
        clearData()
        return
      }
    } else {
      toast.warning('Некоторые данные отсутствуют')
      clearData()
      return
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Materialın əlavə edilməsi</h2>
        <div>
          <span
            className={styles.close}
            onClick={() => {
              onClose()
              clearData()
            }}
          >
            &times;
          </span>
        </div>

        <div className={styles.modal__wrapper}>
          <div className={styles.a}>
            <div>
              <p>
                Anbardar:{' '}
                <b>
                  {barnUsername}
                  <span>{` (ID: ${userId}) `}</span>
                </b>
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
                Qiymət: <b>{product?.price} manat</b>
              </p>
            </div>
          </div>

          <div style={{ margin: 10 }}>
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
                placeholder="İşlənmiş materialın miqdarını daxil edin"
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>Yararsız Materialın Miqdarı</label>
              <input
                type="text"
                value={brokenStock}
                onChange={(e) => setBrokenStock(e.target.value)}
                placeholder="Yararsız materialın miqdarını daxil edin"
                className={styles.modal__input}
              />
            </div>

            <div>
              <br />
              <label>
                {`Ümumi Materialın Miqdarı: `}
                <b style={{ fontSize: 20 }}>
                  {Number.isNaN(totalStock)
                    ? 'miqdar rəqəm olmalıdır'
                    : totalStock}
                </b>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.modal__cont}>
          <div>
            <button
              className={styles.modal__btn}
              onClick={createNewBarn}
              disabled={validate}
            >
              {spinner ? (
                <div className={spinnerStyles.spinner} />
              ) : (
                'Anbara əlavə edin'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarnModal
