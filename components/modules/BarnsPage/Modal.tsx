import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { createBarnProductFx } from '@/app/api/barn'
import { $user } from '@/context/user'
import { IUser } from '@/types/user'
import { IProduct } from '@/types/products'
import { getLocalStorageUser } from '@/localStorageUser'
import { formatCarNumber } from '@/utils/car'
import { dateFormater } from '@/utils/dateFormater'
import AZ_FLAG_IMAGE from '@/components/elements/AZ_FLAG_IMAGE'

import styles from '@/styles/barn/form/add/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

interface ModalProps {
  isOpen: boolean
  product: IProduct | null
  onClose: () => void
}

const BarnModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const [spinner, setSpinner] = useState<boolean>(false)

  const [openInfoProduct, setOpenInfoProduct] = useState(true)
  const [senderName, setSenderName] = useState<string>('')

  // car
  const [driverName, setDriverName] = useState<string>('')
  const [isAze, setIsAze] = useState<'yes' | 'no' | ''>('')
  const [isOpenAze, setIsOpenAze] = useState(true)
  const [carNumber, setCarNumber] = useState<string>('')

  // from product amd time
  const [fromLocation, setFromLocation] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [userSelectedDate, setUserSelectedDate] = useState<string>('')

  // stocks
  const [newStock, setNewStock] = useState<string>('')
  const [usedStock, setUsedStock] = useState<string>('')
  const [brokenStock, setBrokenStock] = useState<string>('')
  const totalStock = +brokenStock + +usedStock + +newStock

  const validate: boolean =
    senderName.length < 3 ||
    driverName.length < 3 ||
    carNumber.length < 7 ||
    fromLocation.length < 3 ||
    location.length < 3 ||
    !userSelectedDate ||
    totalStock < 0 ||
    isNaN(totalStock)

  console.log('validate')
  console.log(validate)

  const user: IUser = useStore($user)
  const userId = +user?.id || getLocalStorageUser().userIdStorage
  const barnUsername: string =
    user?.username || getLocalStorageUser().usernameStorage

  const clearData = () => {
    setOpenInfoProduct(true)
    setSenderName('')
    setDriverName('')
    setIsAze('')
    setIsOpenAze(true)
    setCarNumber('')
    setFromLocation('')
    setLocation('')
    setUserSelectedDate('')
    setNewStock('')
    setUsedStock('')
    setBrokenStock('')
  }

  const createNewBarn = async () => {
    if (product && userId && !validate) {
      try {
        setSpinner(true)

        const newBarn = {
          userId: +userId,
          productId: product.id,
          senderName,
          driverName,
          carNumber,
          fromLocation,
          location,
          userSelectedDate: dateFormater(userSelectedDate),
          newStock: +newStock,
          usedStock: +usedStock,
          brokenStock: +brokenStock,
        }

        console.log('new barn')
        console.log(newBarn)

        const result = await createBarnProductFx(newBarn)

        if (result.error_message) {
          toast.error(result.error_message)
          return
        }

        toast.success(result.message)
      } catch (error) {
        toast.error((error as AxiosError).message)
        clearData()
      } finally {
        clearData()
        onClose()
        setSpinner(false)
      }
    } else {
      toast.warning('Bütün məlumatları daxil edin !')
    }
  }

  const toggleIsAze: boolean = isAze === 'yes' || isAze === 'no'

  const showPic: React.JSX.Element | '' =
    isAze === 'yes' ? <AZ_FLAG_IMAGE /> : ''

  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div
        className={styles.modalContent}
        style={{
          maxWidth: openInfoProduct ? 1000 : 600,
        }}
      >
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

        <button
          style={{ width: 50, fontSize: 18, cursor: 'pointer' }}
          onClick={() => setOpenInfoProduct(!openInfoProduct)}
        >
          {openInfoProduct ? '❌' : '👁️'}
        </button>

        <div className={styles.modal__content}>
          {/* об амбаре */}
          {openInfoProduct && (
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
          )}

          {/* ввести данные */}

          <div className={styles.values}>
            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>
                  Materialı sizə göndərən şəxsin adı
                </label>
                <span className={styles.icon}>
                  {senderName.length > 3 ? '✅' : '👨‍💼'}
                </span>
              </div>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="göndərənin adını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>Sürücü adı</label>
                <span className={styles.icon}>
                  {driverName.length > 3 ? '✅' : '👨‍✈️'}
                </span>
              </div>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Sürücü adı yazın..."
                className={styles.modal__input}
              />
            </div>

            {/* номер машины */}
            {isOpenAze && (
              <div className={styles.label__container}>
                {/* Вопрос */}

                <div>
                  <div>
                    <label style={{ display: 'flex' }}>
                      {'Azərbaycan avtomobil nömrəsidir ? (12-AB-345) '}
                      <AZ_FLAG_IMAGE />
                    </label>
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setIsAze('yes')
                        setIsOpenAze(false)
                      }}
                    >
                      Bəli
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setIsAze('no')
                        setIsOpenAze(false)
                      }}
                    >
                      Xeyr
                    </button>
                  </div>
                </div>

                {/* Ввод номера машины */}
              </div>
            )}

            {toggleIsAze && (
              <div className={styles.li}>
                <div className={styles.label__container}>
                  <label>
                    {`Maşının nömrəsi `}
                    {carNumber.length > 7 ? '✅' : '🚛'}
                  </label>
                  {showPic}
                  <h4>{isAze === 'no' ? ' -(Başqa ölkə)' : ''}</h4>
                  <span
                    style={{ padding: '0px 5px', color: 'yellow' }}
                    className={styles.button}
                    onClick={() => {
                      setIsOpenAze(true)
                      setIsAze('')
                      setCarNumber('')
                    }}
                  >
                    &times;
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    value={carNumber}
                    onChange={(e) => {
                      setIsOpenAze(false)
                      const value = e.target.value
                      if (isAze === 'yes') {
                        setCarNumber(formatCarNumber(value))
                      } else if (isAze === 'no') {
                        setCarNumber(value)
                      }
                    }}
                    placeholder="Maşının nömrəsini yazın..."
                    className={styles.modal__input}
                  />
                </div>
              </div>
            )}

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>
                  Material hardan gəlir?
                </label>
                <span className={styles.icon}>
                  {fromLocation.length > 3 ? '✅' : '🌍'}
                </span>
              </div>
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="ünvanı yazın..."
                className={styles.modal__input}
              />
            </div>

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>Material hardadır?</label>
                <span className={styles.icon}>
                  {location.length > 3 ? '✅' : '📌'}
                </span>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ünvanı yazın..."
                className={styles.modal__input}
              />
            </div>

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>
                  Materialı hansı tarixdə və saatda almısınız?
                </label>
                <span className={styles.icon}>
                  {userSelectedDate ? '✅' : '📅'}
                </span>
              </div>
              <input
                type="datetime-local"
                value={userSelectedDate}
                onChange={(e) => setUserSelectedDate(e.target.value)}
                className={styles.modal__input}
              />
            </div>

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>
                  Yeni Materialın Miqdarı
                </label>
                <span className={styles.icon}>🆕📦</span>
              </div>
              <input
                type="text"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                placeholder="Yeni materialın miqdarını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>
                  İşlənmiş Materialın Miqdarı
                </label>
                <span className={styles.icon}>🛠️📦</span>
              </div>
              <input
                type="text"
                value={usedStock}
                onChange={(e) => setUsedStock(e.target.value)}
                placeholder="İşlənmiş materialın miqdarını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div className={styles.li}>
              <div className={styles.label__container}>
                <label className={styles.label__text}>
                  Yararsız Materialın Miqdarı
                </label>
                <span className={styles.icon}>❌📦</span>
              </div>
              <input
                type="text"
                value={brokenStock}
                onChange={(e) => setBrokenStock(e.target.value)}
                placeholder="Yararsız materialın miqdarını yazın..."
                className={styles.modal__input}
              />
            </div>

            <div className={styles.label__container}>
              <label className={styles.label__text}>
                {`Ümumi Materialın Miqdarı: `}
                <b style={{ fontSize: 20 }}>
                  {Number.isNaN(totalStock)
                    ? 'miqdar rəqəm olmalıdır'
                    : totalStock}
                </b>
              </label>
              <span className={styles.icon}>
                {totalStock > 0 ? '✅' : '📦'}
              </span>
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
