import React, { useState, useEffect } from 'react'
import { formaterDate } from '@/utils/dateFormater'
import { IStocksBarn } from '@/types/barn'
import styles from '@/styles/barn/form/index.module.scss'
import { TiTick, TiTimes } from 'react-icons/ti'

const BarnForm: React.FC<{ barnId: number }> = ({ barnId = 0 }) => {
  const [disabled, setDisabled] = useState(true)

  const [userSelectedDate, setUserSelectedDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [isDateValid, setIsDateValid] = useState<boolean>(false)

  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [locationError, setLocationError] = useState('')
  const [isFromLocationValid, setIsFromLocationValid] = useState<boolean>(false)
  const [isToLocationValid, setIsToLocationValid] = useState<boolean>(false)

  const [newStock, setNewStock] = useState('')
  const [usedStock, setUsedStock] = useState('')
  const [brokenStock, setBrokenStock] = useState('')

  const [stockError, setStockError] = useState('')
  const [isStockValid, setIsStockValid] = useState<boolean>(false)

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
        setStockError('Səhv miqdar.')
        setIsStockValid(false)
        isValid = false
      } else {
        setStockError('')
        setIsStockValid(true)
      }

      return isValid
    }

    setDisabled(validateForm())
  }, [
    userSelectedDate,
    fromLocation,
    toLocation,
    newStock,
    usedStock,
    brokenStock,
  ])

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

    const stocks: IStocksBarn = {
      userSelectedDate: formaterDate(userSelectedDate),
      fromLocation,
      toLocation,
      newStock: +newStock,
      usedStock: +usedStock,
      brokenStock: +brokenStock,
      barnId,
    }

    console.log(stocks)

    // try {
    //   await postAddStocksBarn(stocks)
    //   // router.push('/some-path') // замените на нужный путь после успешного добавления
    // } catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {locationError && (
        <div style={{ color: 'red', textAlign: 'center' }}>{locationError}</div>
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

      {stockError && <div style={{ color: 'red' }}>{stockError}</div>}
      <div className={styles.form__stocks_header}>
        <label>
          {'Material miqdarı? '}
          {isStockValid ? (
            <TiTick style={{ color: 'green' }} />
          ) : (
            <TiTimes style={{ color: 'red' }} />
          )}
        </label>
      </div>

      <div className={styles.form__stocks}>
        <div className={styles.form_group}>
          <label>Yeni</label>
          <input
            className={styles.form_group__stocks}
            type="text"
            value={newStock}
            onChange={(e) => handleInputChange(e, setNewStock, setIsStockValid)}
            min="0"
            required
          />
          {}
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
            required
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
            required
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

      <button
        type="submit"
        className={styles.submit_button}
        disabled={disabled}
      >
        artırmaq
      </button>
    </form>
  )
}

export default BarnForm
