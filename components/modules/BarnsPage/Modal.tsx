import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { createBarnProductFx } from '@/app/api/barn'
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
  const [spinner, setSpinner] = useState<boolean>(false)
  const [senderName, setSenderName] = useState<string>('')
  const [driverName, setDriverName] = useState<string>('')
  const [isAze, setIsAze] = useState(false)
  const [isOpenAze, setIsOpenAze] = useState(false)
  const [carNumber, setCarNumber] = useState<string>('')
  const [fromLocation, setFromLocation] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [userSelectedDate, setUserSelectedDate] = useState<string>('')
  const [newStock, setNewStock] = useState<string>('')
  const [usedStock, setUsedStock] = useState<string>('')
  const [brokenStock, setBrokenStock] = useState<string>('')
  const totalStock = +brokenStock + +usedStock + +newStock

  const validate: boolean = !location || totalStock <= 0 || isNaN(totalStock)

  const formatCarNumber = (value: string): string => {
    // Удаление всех нецифровых символов, кроме букв
    const cleanedValue = value.replace(/[^A-Z0-9]/gi, '')

    // Форматирование строки с тире
    let formattedValue = ''

    const digits = cleanedValue.replace(/[^0-9]/g, '') // Оставляем только цифры
    const letters = cleanedValue.replace(/[0-9]/g, '') // Оставляем только буквы

    if (digits.length > 0) {
      formattedValue += digits.slice(0, 2) // Первые 2 цифры
    }
    if (letters.length > 0) {
      formattedValue += '-' + letters.slice(0, 2).toLocaleUpperCase() // Следующие 2 буквы
    }
    if (digits.length > 2) {
      formattedValue += '-' + digits.slice(2, 5) // Оставшиеся 3 цифры
    }

    return formattedValue
  }

  const user: IUser = useStore($user)
  const userId = +user?.id || getLocalStorageUser().userIdStorage
  const barnUsername: string =
    user?.username || getLocalStorageUser().usernameStorage

  const clearData = () => {
    setSenderName('')
    setDriverName('')
    setIsAze(false)
    setIsOpenAze(false)
    setCarNumber('')
    setFromLocation('')
    setLocation('')
    setUserSelectedDate('')
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
        setSpinner(true)

        const newBarn = await createBarnProductFx({
          userId: +userId,
          productId: product.id,
          senderName,
          driverName,
          carNumber,
          fromLocation,
          location,
          userSelectedDate,
          newStock: +newStock,
          usedStock: +usedStock,
          brokenStock: +brokenStock,
        })

        if (newBarn.error_message) {
          toast.error(newBarn.error_message)
          return
        }

        toast.success(newBarn.message)
      } catch (error) {
        toast.error((error as AxiosError).message)
        clearData()
      } finally {
        setSpinner(false)
        onClose()
        clearData()
      }
    } else {
      toast.warning('Некоторые данные отсутствуют')
      clearData()
    }
  }

  console.log(carNumber)

  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 style={{ textAlign: 'center' }}>
          Anbarda material yaratmaq Formasi
        </h2>
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

        <div className={styles.modal__content}>
          {/* об амбаре */}
          <div className={styles.info}>
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

          {/* ввести данные */}

          <div className={styles.values}>
            <div>
              <label>Materialı sizə göndərənin şəxsın adı</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="göndərənin adını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>Sürücü adı</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Sürücü adı yazın..."
                className={styles.modal__input}
              />
            </div>

            {/* номер машины */}

            <div className={styles.car__wrapper}>
              {/* Вопрос */}
              {isOpenAze && (
                <div className={styles.questionSection}>
                  <label>{'Azərbaycan avtomobil nömrəsidir ?'}</label>
                  <label>{'(12-AB-345)'}</label>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setIsAze(true)
                        setIsOpenAze(false)
                      }}
                    >
                      Bəli
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setIsAze(false)
                        setIsOpenAze(false)
                      }}
                    >
                      Xeyr
                    </button>
                  </div>
                </div>
              )}

              {/* Ввод номера машины */}
              <div className={styles.inputSection}>
                <label>{'Maşının nömrəsidir ?'}</label>
                <input
                  type="text"
                  value={carNumber}
                  onClick={() => setIsOpenAze(true)}
                  onChange={(e) => {
                    setIsOpenAze(false)
                    const value = e.target.value
                    if (isAze) {
                      setCarNumber(formatCarNumber(value))
                    } else {
                      setCarNumber(value)
                    }
                  }}
                  placeholder="Maşının nömrəsini yazın..."
                  className={styles.modal__input}
                />
              </div>
            </div>

            <div>
              <label>Material hardan gəlir ?</label>
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="ünvanı yazın..."
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>Material hardadır ?</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ünvanı yazın..."
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>Materialı hansı tarixdə və saatda almısınız?</label>
              <input
                type="datetime-local"
                value={userSelectedDate}
                onChange={(e) => setUserSelectedDate(e.target.value)}
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>Yeni Materialın Miqdarı</label>
              <input
                type="text"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                placeholder="Yeni materialın miqdarını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>İşlənmiş Materialın Miqdarı</label>
              <input
                type="text"
                value={usedStock}
                onChange={(e) => setUsedStock(e.target.value)}
                placeholder="İşlənmiş materialın miqdarını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div>
              <label>Yararsız Materialın Miqdarı</label>
              <input
                type="text"
                value={brokenStock}
                onChange={(e) => setBrokenStock(e.target.value)}
                placeholder="Yararsız materialın miqdarını yazın..."
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
                'Anbarda material yaratmaq'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarnModal
