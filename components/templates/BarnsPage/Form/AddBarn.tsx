import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { TiTick, TiTimes } from 'react-icons/ti'

import { dateFormater } from '@/utils/dateFormater'
import { IBarnItem, IStocksAddBarn } from '@/types/barn'
import { getBarnById, postAddStocksBarn } from '@/app/api/barn'
import AddMaterialComponent from '../MaterialComponent/AddMaterial'

import styles from '@/styles/barn/form/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const AddBarn: React.FC<{ barnId: number }> = ({ barnId = 0 }) => {
  const [senderName, setSenderName] = useState<string>('')
  const [senderNameError, setSenderNameError] = useState<string>('')
  const [isSenderNameValid, setIsSenderNameValid] = useState<boolean>(false)
  // car
  // const [isAze, setIsAze] = useState<'yes' | 'no' | ''>('')
  // const [isOpenAze, setIsOpenAze] = useState(true)
  const [driverName, setDriverName] = useState<string>('')
  const [driverNameError, setDriverNameError] = useState<string>('')
  const [isDriverNameValid, setIsDriverNameValid] = useState<boolean>(false)

  const [carNumber, setCarNumber] = useState<string>('')
  const [carNumberError, setCarNumberError] = useState<string>('')
  const [isCarNumberValid, setIsCarNumberValid] = useState<boolean>(false)

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

  const [newStock, setNewStock] = useState<string>('')
  const [usedStock, setUsedStock] = useState<string>('')
  const [brokenStock, setBrokenStock] = useState<string>('')

  const [stockError, setStockError] = useState<string>('')
  const [isStockValid, setIsStockValid] = useState<boolean>(false)

  const isDisabled = Boolean(locationError + stockError + dateError)

  useEffect(() => {
    const validateForm = () => {
      let isValid = true
      const messageAze = 'daxil etməlisiniz'

      if (senderName.length <= 3) {
        setSenderNameError(`şəxsin adı ${messageAze}`)
        setIsSenderNameValid(false)
        isValid = false
      } else {
        setSenderNameError('')
        setIsSenderNameValid(true)
      }

      if (driverName.length <= 3) {
        setDriverNameError(`Sürücü adı ${messageAze}`)
        setIsDriverNameValid(false)
        isValid = false
      } else {
        setDriverNameError('')
        setIsDriverNameValid(true)
      }

      if (carNumber.length <= 5) {
        setCarNumberError(`Maşının nömrəsi  ${messageAze}`)
        setIsCarNumberValid(false)
        isValid = false
      } else {
        setCarNumberError('')
        setIsCarNumberValid(true)
      }

      // Проверка даты
      if (userSelectedDate) {
        if (dateFormater(userSelectedDate) === 'Invalid Date') {
          setDateError('Yanlış Tarix')
          setIsDateValid(false)
          isValid = false
        } else {
          setDateError('')
          setIsDateValid(true)
        }
      } else {
        setDateError(`Lütfən, ünvanı ${messageAze}`)
        setIsDateValid(false)
        isValid = false
      }

      // Проверка местоположений
      if (fromLocation.length < 3 || toLocation.length < 3) {
        setLocationError(`Lütfən, hər iki ünvanı  ${messageAze}`)
        setIsFromLocationValid(false)
        isValid = false
      } else {
        setLocationError('')
        setIsFromLocationValid(true)
      }

      if (toLocation.trim() === '') {
        setLocationError(`Lütfən, ünvanı ${messageAze}`)
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
    senderName.length,
    driverName.length,
    carNumber.length,
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

    const formData: IStocksAddBarn = {
      barnId,
      userSelectedDate: dateFormater(userSelectedDate),
      fromLocation,
      toLocation,
      newStock: +newStock,
      usedStock: +usedStock,
      brokenStock: +brokenStock,
      senderName,
      driverName,
      carNumber,
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
        {/* senderName */}
        <div className={styles.form__locations}>
          <div className={styles.form_group}>
            <div style={{ color: 'red' }}>{senderNameError}</div>
            <label>
              Materialı sizə göndərən şəxsin adı
              {handleIconSwitch(isSenderNameValid)}
            </label>

            <input
              className={styles.form_group__adress}
              required
              type="text"
              value={senderName}
              onChange={(e) =>
                handleInputChange(e, setSenderName, setIsSenderNameValid)
              }
            />
          </div>
        </div>

        {/* driverName  2 */}
        <div className={styles.form__locations}>
          <div className={styles.form_group}>
            <div style={{ color: 'red' }}>{driverNameError}</div>
            <label>
              Sürücü adı
              {handleIconSwitch(isDriverNameValid)}
            </label>

            <input
              className={styles.form_group__adress}
              required
              type="text"
              value={driverName}
              onChange={(e) =>
                handleInputChange(e, setDriverName, setIsDriverNameValid)
              }
            />
          </div>
        </div>

        {/* carNumber  3 */}
        <div className={styles.form__locations}>
          <div className={styles.form_group}>
            <div style={{ color: 'red' }}>{carNumberError}</div>
            <label>
              Maşının nömrəsi 🚛
              {handleIconSwitch(isCarNumberValid)}
            </label>

            <input
              className={styles.form_group__adress}
              required
              type="text"
              value={carNumber}
              onChange={(e) =>
                handleInputChange(e, setCarNumber, setIsCarNumberValid)
              }
            />
          </div>
        </div>

        {/* bed */}

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
            Materialın qəbul tarixi və vaxtı
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
