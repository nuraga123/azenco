import { useRouter } from 'next/router'
import { FormEvent, useState, useEffect, ChangeEvent, useCallback } from 'react'
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
  const [azencoCode, setAzencoCode] = useState<string>('')
  const [azencoCodeErrorMessage, setAzencoCodeErrorMessage] =
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

  const validateType = useCallback(() => {
    const minLength = 3
    const maxLength = 35

    if (type.length < minLength || type.length > maxLength) {
      setTypeErrorMessage(
        'Növü 3 hərfdən çox olmalıdır və 35 hərfdən az olmalıdır!'
      )
      return false
    }

    setTypeErrorMessage('ok')
    return true
  }, [type])

  const validateUnit = useCallback(() => {
    const minLength = 3
    const maxLength = 35

    if (unit.length < minLength || unit.length > maxLength) {
      setUnitErrorMessage(
        'Ölçü vahidi 3 hərfdən çox olmalıdır və 35 hərfdən az olmalıdır!'
      )
      return false
    }
    setUnitErrorMessage('ok')
    return true
  }, [unit])

  // Функция для отправки данных формы
  const addProduct = async (new__product: DataNewProduct) => {
    try {
      setSpinner(true)
      const result = await addProductFx({
        url: '/products/add',
        new__product,
      })

      if (result.success) {
        toast.success('Material Əlavə Edildi!')
        router.push('/products')
      } else {
        toast.warning(result?.error)
      }
    } catch (error) {
      const err = (error as Error).message
      toast.error(err)
    } finally {
      setSpinner(false)
    }
  }

  // Обработка события отправки формы
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      validateAzencoCode() &&
      validateName() &&
      validateType() &&
      validateUnit() &&
      validatePrice()
    ) {
      const newProduct: DataNewProduct = {
        azencoCode: azencoCode.replace(/-/g, ''),
        name,
        type,
        unit,
        price,
        images,
      }
      addProduct(newProduct)
    }
  }

  useEffect(() => {
    const isFormValid =
      validateAzencoCode() &&
      validateName() &&
      validateType() &&
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
    validateType,
    validateUnit,
    validatePrice,
  ])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
          <div>Növü *</div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Növü 3 hərfdən çox olmalıdır"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          {typeErrorMessage === 'ok' && '✅'}
          {typeErrorMessage !== 'ok' && (
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
          {unitErrorMessage === 'ok' ? (
            '✅'
          ) : (
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
          {priceErrorMessage === 'ok' && '✅'}
          {priceErrorMessage !== 'ok' && (
            <div className={styles.error}>{priceErrorMessage}</div>
          )}
        </div>

        <div className={styles.container}>
          <div>{`Şəkil (isteğe bağlı саhе)`}</div>
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
