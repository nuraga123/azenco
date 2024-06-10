import React, { useState, useEffect } from 'react'
import { formaterDate } from '@/utils/dateFormater'
import { IBarnItem, IStocksBarn } from '@/types/barn'
import { TiTick, TiTimes } from 'react-icons/ti'
import { getBarnById, postAddStocksBarn } from '@/app/api/barn'
import MaterialComponent from './MaterialComponent'

import styles from '@/styles/barn/form/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const BarnForm: React.FC<{ barnId: number }> = ({ barnId = 0 }) => {
  const [spinner, setSpinner] = useState<boolean>(false)
  const [barnData, setBarnData] = useState({} as IBarnItem)
  const [userSelectedDate, setUserSelectedDate] = useState<string>('')
  const [dateError, setDateError] = useState<string>('')
  const [isDateValid, setIsDateValid] = useState<boolean>(false)

  const [fromLocation, setFromLocation] = useState<string>('')
  const [toLocation, setToLocation] = useState<string>('')
  const [locationError, setLocationError] = useState<string>('')
  const [isFromLocationValid, setIsFromLocationValid] = useState<boolean>(false)
  const [isToLocationValid, setIsToLocationValid] = useState<boolean>(false)

  const [newStock, setNewStock] = useState<string>('0')
  const [usedStock, setUsedStock] = useState<string>('0')
  const [brokenStock, setBrokenStock] = useState<string>('0')

  const [stockError, setStockError] = useState<string>('')
  const [isStockValid, setIsStockValid] = useState<boolean>(false)

  const isDisabled = Boolean(locationError + stockError + dateError)

  useEffect(() => {
    const validateForm = () => {
      let isValid = true

      // Проверка даты
      if (formaterDate(userSelectedDate) === 'Invalid Date') {
        setDateError('Yanlış Tarix')
        setIsDateValid(false)
        isValid = false
      } else {
        setDateError('')
        setIsDateValid(true)
      }

      // Проверка местоположений
      if (fromLocation.length < 3) {
        setLocationError('Lütfən, hər iki ünvanı daxil edin.')
        setIsFromLocationValid(false)
        isValid = false
      } else {
        setLocationError('')
        setIsFromLocationValid(true)
      }

      if (toLocation.trim() === '') {
        setLocationError('Lütfən, hər iki ünvanı daxil edin.')
        setIsToLocationValid(false)
        isValid = false
      } else {
        setLocationError('')
        setIsToLocationValid(true)
      }

      // Проверка материалов
      const totalStock = +newStock + +usedStock + +brokenStock
      if (isNaN(totalStock) || totalStock <= 0) {
        setStockError('Ən azı 1 ədəd material yazın? ')
        setIsStockValid(false)
        isValid = false
      } else {
        setStockError('')
        setIsStockValid(true)
      }

      return isValid
    }

    validateForm()
  }, [
    userSelectedDate,
    fromLocation,
    toLocation,
    newStock,
    usedStock,
    brokenStock,
  ])

  useEffect(() => {
    const loadBarn = async () => {
      const { barn } = await getBarnById(barnId)
      if (barn) setBarnData(barn)
      console.log(barn)
    }

    loadBarn()
  }, [barnId])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const { value } = e.target
    setValue(value)

    // Проверка и установка состояния валидности
    if (value.trim() === '') {
      setIsValid(false)
    } else {
      setIsValid(validateField(value))
    }
  }

  const validateField = (value: string) => value.trim() !== ''

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: IStocksBarn = {
      userSelectedDate: formaterDate(userSelectedDate),
      fromLocation,
      toLocation,
      newStock: +newStock,
      usedStock: +usedStock,
      brokenStock: +brokenStock,
      barnId,
    }

    console.log(formData)

    try {
      setSpinner(true)
      const res = await postAddStocksBarn(formData)
      console.log(res)
      // router.push('/some-path') // замените на нужный путь после успешного добавления
    } catch (error) {
      console.error(error)
      setSpinner(false)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={styles.barn_form}>
      <form className={styles.form} onSubmit={onSubmit}>
        {locationError && (
          <div style={{ color: 'red', textAlign: 'center' }}>
            {locationError}
          </div>
        )}
        <div className={styles.form__locations}>
          <div className={styles.form_group}>
            <label>
              {'Hansi ünvanından gəldi? '}
              {isFromLocationValid ? (
                <TiTick style={{ color: 'green' }} />
              ) : (
                <TiTimes style={{ color: 'red' }} />
              )}
            </label>
            <input
              className={styles.form_group__adress}
              required
              type="text"
              value={fromLocation}
              onChange={(e) =>
                handleInputChange(e, setFromLocation, setIsFromLocationValid)
              }
            />
          </div>

          <div className={styles.form_group}>
            <label>
              {'Hansı ünvana çatdırılıb? '}
              {isToLocationValid ? (
                <TiTick style={{ color: 'green' }} />
              ) : (
                <TiTimes style={{ color: 'red' }} />
              )}
            </label>
            <input
              className={styles.form_group__adress}
              required
              type="text"
              value={toLocation}
              onChange={(e) =>
                handleInputChange(e, setToLocation, setIsToLocationValid)
              }
            />
          </div>
        </div>

        <div className={styles.form__stocks_header}>
          <label>
            {'Material miqdarı? '}
            {isStockValid ? (
              <TiTick style={{ color: 'green' }} />
            ) : (
              <TiTimes style={{ color: 'red' }} />
            )}
            {stockError && <div style={{ color: 'red' }}>{stockError}</div>}
          </label>
        </div>

        <div className={styles.form__stocks}>
          <div className={styles.form_group}>
            <label>Yeni</label>
            <input
              className={styles.form_group__stocks}
              type="text"
              value={newStock}
              onChange={(e) =>
                handleInputChange(e, setNewStock, setIsStockValid)
              }
              min="0"
            />
          </div>

          <div className={styles.form_group}>
            <label>İstifadə olunmuş</label>
            <input
              className={styles.form_group__stocks}
              type="text"
              value={usedStock}
              onChange={(e) =>
                handleInputChange(e, setUsedStock, setIsStockValid)
              }
              min="0"
            />
          </div>

          <div className={styles.form_group}>
            <label>Zədələnmiş</label>
            <input
              className={styles.form_group__stocks}
              type="text"
              value={brokenStock}
              onChange={(e) =>
                handleInputChange(e, setBrokenStock, setIsStockValid)
              }
              min="0"
            />
          </div>
        </div>

        <div className={styles.form_group}>
          {dateError && <div style={{ color: 'red' }}>{dateError}</div>}
          <label htmlFor="userSelectedDate">
            Alınma tarix?
            {isDateValid ? (
              <TiTick style={{ color: 'green' }} />
            ) : (
              <TiTimes style={{ color: 'red' }} />
            )}
          </label>
          <input
            className={styles.form_group__date}
            type="datetime-local"
            id="userSelectedDate"
            name="userSelectedDate"
            value={userSelectedDate}
            onChange={(e) =>
              handleInputChange(e, setUserSelectedDate, setIsDateValid)
            }
            required
          />
        </div>

        {spinner ? (
          <div className={spinnerStyles.spinner} />
        ) : (
          <button
            type="submit"
            className={styles.submit_button}
            disabled={isDisabled}
          >
            artırmaq
          </button>
        )}
      </form>

      <MaterialComponent barn={barnData} />
    </div>
  )
}

export default BarnForm
