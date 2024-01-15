import { useRouter } from 'next/router'
import { FormEvent, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { addProductFx } from '@/app/api/products'
import { DataNewProduct } from '@/types/products'
import styles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const FormProductPage: React.FC = () => {
  const router = useRouter()
  const [spinner, setSpinner] = useState<boolean>(false)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

  // Состояния для полей формы
  const [azenco__code, setAzenco__code] = useState<string>('')
  const [azenco__codeErrorMessage, setAzenco__codeErrorMessage] =
    useState<string>('')

  const [name, setName] = useState<string>('')
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('')

  const [type, setType] = useState<string>('')
  const [typeErrorMessage, setTypeErrorMessage] = useState<string>('')

  const [unit, setUnit] = useState<string>('')
  const [unitErrorMessage, setUnitErrorMessage] = useState<string>('')

  const [price, setPrice] = useState<string>('')
  const [priceErrorMessage, setPriceErrorMessage] = useState<string>('')

  const [images, setImages] = useState<string>('')

  // Функции для валидации полей
  const validateAzencoCode = () => {
    if (azenco__code.length < 2 || azenco__code.length > 15) {
      setAzenco__codeErrorMessage(
        'Azenco code должен содержать от 2 до 15 символов'
      )
      return false
    }
    setAzenco__codeErrorMessage('')
    return true
  }

  const validateName = () => {
    if (name.length < 3 || name.length > 100) {
      setNameErrorMessage('Name должно содержать от 3 до 100 символов')
      return false
    }
    setNameErrorMessage('')
    return true
  }

  const validatePrice = () => {
    const priceRegex = /^\d+(\.\d{1,2})?$/
    if (!priceRegex.test(price)) {
      setPriceErrorMessage(
        'Цена должна быть числом с не более чем двумя десятичными знаками'
      )
      return false
    }
    setPriceErrorMessage('')
    return true
  }

  const validateTypeAndUnit = () => {
    const minLength = 3
    const maxLength = 35

    if (type.length < minLength || type.length > maxLength) {
      setTypeErrorMessage(
        `Type должно содержать от ${minLength} до ${maxLength} символов`
      )
      return false
    }

    if (unit.length < minLength || unit.length > maxLength) {
      setUnitErrorMessage(
        `Unit должно содержать от ${minLength} до ${maxLength} символов`
      )
      return false
    }

    setTypeErrorMessage('')
    setUnitErrorMessage('')
    return true
  }

  // Функция для отправки данных формы
  const addProductAF = async (dataNewProduct: DataNewProduct) => {
    try {
      setSpinner(true)
      const result = await addProductFx({
        url: '/products/add',
        new__product: dataNewProduct,
      })

      console.log(result)

      if (result.success) {
        toast.success('Material Əlavə Edildi !')
        router.push('/products')
        return result
      } else {
        toast.warning(result.error)
      }
    } catch (error) {
      const err = (error as Error).message
      console.log(err)
      toast.error(err)
    } finally {
      setSpinner(false)
    }
  }

  // Функция валидации данных формы
  const validateInput = () =>
    validateAzencoCode() &&
    validateName() &&
    validatePrice() &&
    validateTypeAndUnit()

  // Объект с данными формы
  const dataInputsProduct = {
    azenco__code,
    name,
    type,
    unit,
    price,
    images,
  }

  // Функция для обработки события отправки формы
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Проверка валидации перед отправкой данных
    if (validateInput()) {
      setBtnDisabled(false)
      addProductAF(dataInputsProduct)
    } else {
      toast.error('Пожалуйста, проверьте правильность введенных данных')
    }
  }

  // Обновление состояния btnDisabled при изменении данных формы
  useEffect(() => {
    setBtnDisabled(!validateInput())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [azenco__code, name, type, unit, price, images])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Yeni Material Forması</h2>
      <div className={styles.form__container}>
        <div className={styles.container}>
          <div>Azenco Kodu *</div>
          <input
            type="text"
            value={azenco__code}
            onChange={(e) => setAzenco__code(e.target.value)}
          />
          {azenco__codeErrorMessage && (
            <div className={styles.error}>{azenco__codeErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>Material Adi *</div>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          {nameErrorMessage && (
            <div className={styles.error}>{nameErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>Növü *</div>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          {typeErrorMessage && (
            <div className={styles.error}>{typeErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>Ölçü Vahidi *</div>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          {unitErrorMessage && (
            <div className={styles.error}>{unitErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>{`Qiymət (manat) *`}</div>
          <input
            value={price}
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
          {priceErrorMessage && (
            <div className={styles.error}>{priceErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>{`Şəkil (isteğe bağlı саhе)`}</div>
          <input
            type="text"
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
