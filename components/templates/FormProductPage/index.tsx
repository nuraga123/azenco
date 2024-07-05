// import { useRouter } from 'next/router'
import React, {
  FormEvent,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react'
import { toast } from 'react-toastify'
import { addProductFx } from '@/app/api/products'
import { DataNewProduct } from '@/types/products'
import styles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const FormProductPage = () => {
  const height = window.innerHeight < 900 ? 1000 : 800
  //const router = useRouter()
  const [spinner, setSpinner] = useState<boolean>(false)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

  // Состояния для полей формы
  const [azencoCode, setAzencoCode] = useState<string>('')
  const [azencoCodeErrorMessage, setAzencoCodeErrorMessage] =
    useState<string>('')

  const [name, setName] = useState<string>('')
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('')

  const [unit, setUnit] = useState<string>('')
  const [unitErrorMessage, setUnitErrorMessage] = useState<string>('')

  const [price, setPrice] = useState<string>('')
  const [priceErrorMessage, setPriceErrorMessage] = useState<string>('')

  const [type, setType] = useState<string>('')
  const [images, setImages] = useState<string>('')

  const handleChangeAzencoCode = (e: ChangeEvent<HTMLInputElement>) => {
    const addDefis = (value: string) =>
      value.replace(/-/g, '').replace(/(.{3})(?=.)/g, '$1-')

    const rawValue = e.target.value
    const formattedValue = addDefis(rawValue)
    setAzencoCode(formattedValue)
  }

  // Функции для валидации полей
  const validateAzencoCode = useCallback(() => {
    if (azencoCode.replace(/-/g, '').length !== 9) {
      setAzencoCodeErrorMessage('Azenco kodu 9 simvoldan ibarət olmalıdır')
      return false
    }
    setAzencoCodeErrorMessage('ok')
    return true
  }, [azencoCode])

  const validateName = useCallback(() => {
    if (name.length < 3 || name.length > 100) {
      setNameErrorMessage(
        'Material adı 3 hərfdən çox olmalıdır və 100 hərfdən az olmalıdır!'
      )
      return false
    }
    setNameErrorMessage('ok')
    return true
  }, [name])

  const validatePrice = useCallback(() => {
    const priceRegex = /^\d+(\.\d{1,2})?$/
    if (!priceRegex.test(price)) {
      setPriceErrorMessage(
        'Qəpiklər 2 rəqəmdən çox göstərilə bilməz! Məsələn: 9.99 ola bilər, amma 9.999 ola bilməz'
      )
      return false
    }
    setPriceErrorMessage('ok')
    return true
  }, [price])

  const validateUnit = useCallback(() => {
    const minLength = 1
    const maxLength = 35

    if (unit.length < minLength || unit.length > maxLength) {
      setUnitErrorMessage('Ölçü birini seçin olmalıdır!')
      return false
    }
    setUnitErrorMessage('ok')
    return true
  }, [unit])

  const removeDataInput = () => {
    setAzencoCode('')
    setName('')
    setUnit('')
    setPrice('')
    setType('')
    setImages('')
  }

  // Функция для отправки данных формы
  const addProduct = async (new__product: DataNewProduct) => {
    try {
      setSpinner(true)
      const result = await addProductFx({
        url: '/products/add',
        new__product,
      })

      if (result.success) {
        toast.success(result.message)
        //router.push('/products')
        removeDataInput()
      } else {
        toast.warning(result.error_message)
      }
    } catch (error) {
      const err = (error as Error).message
      toast.error(err)
    } finally {
      setSpinner(false)
    }
  }

  const formatPrice = Intl.NumberFormat('ru-RU').format(+price)

  // Обработка события отправки формы
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      validateAzencoCode() &&
      validateName() &&
      validateUnit() &&
      validatePrice()
    ) {
      const newProduct: DataNewProduct = {
        azencoCode: azencoCode.replace(/-/g, ''),
        price: +price,
        name,
        type,
        unit,
        images,
      }
      console.log(newProduct)
      addProduct(newProduct)
    }
  }

  useEffect(() => {
    const isFormValid =
      validateAzencoCode() &&
      validateName() &&
      validateUnit() &&
      validatePrice()

    setBtnDisabled(!isFormValid)
  }, [
    azencoCode,
    name,
    price,
    type,
    unit,
    validateAzencoCode,
    validateName,
    validateUnit,
    validatePrice,
  ])

  const units = ['metr', 'kg', 'ədəd', 'litr']
  const [showDropdown, setShowDropdown] = useState(false)

  const handleUnitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value)
    if (!e.target.value.length) {
      setUnitErrorMessage('Ölçü birini seçin')
    } else {
      setUnitErrorMessage('ok')
    }
  }

  const handleUnitSelect = (selectedUnit: string) => {
    setUnit(selectedUnit)
    setShowDropdown(false)
    setUnitErrorMessage('ok')
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      style={{ height: `${height}px` }}
    >
      <h2 className={styles.title}>Yeni Material Forması</h2>
      <div className={styles.form__container}>
        <div className={styles.container}>
          <div>Azenco Kodu *</div>
          <input
            style={{ letterSpacing: 2 }}
            type="text"
            placeholder="9 simvoldan ibarət olmalıdır"
            autoComplete="off"
            value={azencoCode}
            onChange={handleChangeAzencoCode}
          />
          {azencoCodeErrorMessage === 'ok' && '✅'}
          {azencoCodeErrorMessage !== 'ok' && (
            <div className={styles.error}>{azencoCodeErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>Material Adi *</div>
          <input
            type="text"
            autoComplete="off"
            placeholder="3 hərfdən çox olmalıdır"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameErrorMessage === 'ok' && '✅'}
          {nameErrorMessage !== 'ok' && (
            <div className={styles.error}>{nameErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>Ölçü Vahidi *</div>
          <input
            type="text"
            autoComplete="off"
            placeholder={`${[...units]}`}
            value={unit}
            onChange={(e) => handleUnitChange(e)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          {unitErrorMessage === 'ok' ? (
            '✅'
          ) : (
            <div className={styles.error}>{unitErrorMessage}</div>
          )}
          {showDropdown && (
            <ul className={styles.dropdown}>
              <p className={styles.dropdown__title}>
                <i>Siyahıdan birini seçin</i>
              </p>
              {units
                .filter((u) => u.toLowerCase().includes(unit.toLowerCase()))
                .map((u) => (
                  <li key={u} onClick={() => handleUnitSelect(u)}>
                    {u}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className={styles.container}>
          <div>
            Qiymət: <b>{`${formatPrice}`}</b> manat
          </div>
          <input
            value={price}
            type="text"
            placeholder=""
            onChange={(e) => setPrice(e.target.value)}
          />
          {priceErrorMessage === 'ok' && '✅'}
          {priceErrorMessage !== 'ok' && (
            <div className={styles.error}>{priceErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>{`Növü (isteğe bağlı)`}</div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Qəpiklər 2 rəqəmdən çox göstərilə bilməz!"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div>{`Şəkil (isteğe bağlı)`}</div>
          <input
            type="text"
            placeholder="istəsəniz şəkil əlavə edə bilərsiniz"
            autoComplete="off"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.container}>
        <button
          type="submit"
          className={btnDisabled ? styles.btnDisabled : styles.add__button}
          disabled={btnDisabled}
        >
          {spinner ? (
            <div className={spinnerStyles.spinner} />
          ) : (
            'Material Əlavə Etmək'
          )}
        </button>
      </div>
    </form>
  )
}

export default FormProductPage
