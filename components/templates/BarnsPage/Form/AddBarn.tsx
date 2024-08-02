import React, { useState, useEffect } from 'react'
import { dateFormater } from '@/utils/dateFormater'
import { IBarnItem, IStocksBarn } from '@/types/barn'
import { TiTick, TiTimes } from 'react-icons/ti'
import { getBarnById, postAddStocksBarn } from '@/app/api/barn'
import AddMaterialComponent from '../MaterialComponent/AddMaterial'

import styles from '@/styles/barn/form/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const AddBarn: React.FC<{ barnId: number }> = ({ barnId = 0 }) => {
  // const [senderName, setSenderName] = useState<string>('')
  // // car
  // const [driverName, setDriverName] = useState<string>('')
  // const [isAze, setIsAze] = useState<'yes' | 'no' | ''>('')
  // const [isOpenAze, setIsOpenAze] = useState(true)
  // const [carNumber, setCarNumber] = useState<string>('')

  const router = useRouter()
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
      if (dateFormater(userSelectedDate) === 'Invalid Date') {
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
      barnId,
      userSelectedDate: dateFormater(userSelectedDate),
      fromLocation,
      toLocation,
      newStock: +newStock,
      usedStock: +usedStock,
      brokenStock: +brokenStock,
    }

    console.log(formData)

    try {
      setSpinner(true)
      const barnProduct = await postAddStocksBarn(formData)
      console.log(barnProduct)

      if (barnProduct?.error_message) {
        toast.error(barnProduct.error_message)
        return
      }

      toast.success(barnProduct.message)
    } catch (error) {
      console.error(error)
      setSpinner(false)
    } finally {
      setSpinner(false)
      router.push('/my/barn')
    }
  }

  const handleIconSwitch = (state: boolean) =>
    state ? (
      <TiTick style={{ color: 'green' }} />
    ) : (
      <TiTimes style={{ color: 'red' }} />
    )

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
              Hansi ünvanından gəldi?
              {handleIconSwitch(isFromLocationValid)}
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
              Hansı ünvana çatdırılıb?
              {handleIconSwitch(isToLocationValid)}
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
            Material miqdarı?
            {handleIconSwitch(isStockValid)}
            {stockError && <div style={{ color: 'red' }}>{stockError}</div>}
          </label>
        </div>

        {/* колличество продукта */}
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

        {/* дата */}
        <div className={styles.form_group}>
          {dateError && <div style={{ color: 'red' }}>{dateError}</div>}
          <label htmlFor="userSelectedDate">
            Alınma tarix?
            {handleIconSwitch(isDateValid)}
          </label>
          <input
            className={styles.form_group__date}
            type="datetime-local"
            id="userSelectedDate"
            name="userSelectedDate"
            value={userSelectedDate}
            required
            onChange={(e) =>
              handleInputChange(e, setUserSelectedDate, setIsDateValid)
            }
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
            ARTIRMAQ
          </button>
        )}
      </form>

      <AddMaterialComponent
        barn={barnData}
        newStockDynamic={+newStock}
        usedStockDynamic={+usedStock}
        brokenStockDynamic={+brokenStock}
      />
    </div>
  )
}

export default AddBarn
