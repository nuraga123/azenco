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
import { numberMetricFormat } from '@/utils/anbar'

const FormProductPage: React.FC = () => {
  const [spinner, setSpinner] = useState<boolean>(false)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

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

  const [showDropdown, setShowDropdown] = useState(false)
  const [showAdditionalFields, setShowAdditionalFields] = useState(false)

  const handleChangeAzencoCode = (e: ChangeEvent<HTMLInputElement>) => {
    const addDefis = (value: string) =>
      value.replace(/-/g, '').replace(/(.{3})(?=.)/g, '$1-')

    const rawValue = e.target.value
    const formattedValue = addDefis(rawValue)
    setAzencoCode(formattedValue)
  }

  const validateAzencoCode = useCallback(() => {
    if (azencoCode.replace(/-/g, '').length !== 9) {
      setAzencoCodeErrorMessage('9 simvol olmalıdır !')
      return false
    }
    setAzencoCodeErrorMessage('ok')
    return true
  }, [azencoCode])

  const validateName = useCallback(() => {
    if (name.length < 3 || name.length > 100) {
      setNameErrorMessage('3 çox və 100 hərfdən az olmalıdır!')
      return false
    }
    setNameErrorMessage('ok')
    return true
  }, [name])

  const validatePrice = useCallback(() => {
    if (+price === 0) {
      setPriceErrorMessage('Qiymət = 0 ola bilmez')
      return false
    }

    if (price.includes(',')) {
      setPriceErrorMessage('Vergül əvəzinə nöqtə qoyun')
      return false
    }
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

  const validate = useCallback(
    () =>
      validateName() &&
      validateAzencoCode() &&
      validateUnit() &&
      validatePrice(),
    [validateAzencoCode, validateName, validatePrice, validateUnit]
  )

  const removeDataInput = () => {
    setName('')
    setAzencoCode('')
    setUnit('')
    setPrice('')
    setType('')
    setImages('')
  }

  const addProduct = async (new__product: DataNewProduct) => {
    try {
      setSpinner(true)
      const result = await addProductFx({
        url: '/products/add',
        new__product,
      })

      if (result.success) {
        toast.success(result.message)
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate()) {
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
    setBtnDisabled(!validate())
  }, [validate])

  const units = ['ədəd', 'metr', 'kg', 'litr']

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

  console.log(
    nameErrorMessage,
    azencoCodeErrorMessage,
    unitErrorMessage,
    priceErrorMessage
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Yeni Material Forması</h3>
      <div>
        <div className={styles.container}>
          <div>
            {'1) Material Adı'} {nameErrorMessage === 'ok' && ' ✅'}
          </div>
          <input
            className={styles.name}
            type="text"
            autoComplete="off"
            placeholder="3 hərfdən çox olmalıdır"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameErrorMessage !== 'ok' && (
            <div className={styles.error}>{nameErrorMessage}</div>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <div className={styles.form__container}>
            <div className={styles.container}>
              <div>
                {'2) Azenco Kodu'} {azencoCodeErrorMessage === 'ok' && ' ✅'}
              </div>
              <input
                className={styles.azencoCode}
                type="text"
                placeholder="9 simvol olmalıdır !"
                autoComplete="off"
                value={azencoCode}
                onChange={handleChangeAzencoCode}
              />
              {azencoCodeErrorMessage !== 'ok' && (
                <div className={styles.error}>{azencoCodeErrorMessage}</div>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.container}>
                <div>
                  {'4)'} Qiymət: <b>{`${numberMetricFormat(+price)}`}</b> manat
                  {priceErrorMessage === 'ok' && ' ✅'}
                </div>
                <input
                  value={price}
                  type="text"
                  placeholder="0.01"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {priceErrorMessage !== 'ok' && (
                  <div className={styles.error}>{priceErrorMessage}</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.container}>
              <div>
                {'3) '}Ölçü Vahidi {unitErrorMessage === 'ok' && ' ✅'}
              </div>
              <input
                className={styles.form__wrapper__unit}
                type="text"
                autoComplete="off"
                placeholder={`${[...units]}`}
                value={unit}
                onChange={handleUnitChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              {unitErrorMessage !== 'ok' && (
                <div className={styles.error}>{unitErrorMessage}</div>
              )}
              {showDropdown && (
                <ul className={styles.dropdown}>
                  <p className={styles.dropdown__title}>
                    <i>Birini seçin</i>
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
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <div className={styles.container}>
            <button
              type="button"
              className={styles.additionalButton}
              onClick={() => setShowAdditionalFields(!showAdditionalFields)}
            >
              {showAdditionalFields ? 'Gizlət' : 'Əlavə'}
            </button>

            {showAdditionalFields && (
              <div className={styles.additionalFields}>
                <div>
                  <div>Tip</div>
                  <input
                    value={type}
                    type="text"
                    placeholder="Material tipi"
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div>
                  <div>Şəkillər</div>
                  <input
                    value={images}
                    type="text"
                    placeholder="Şəkillər"
                    onChange={(e) => setImages(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={btnDisabled}
              style={{ backgroundColor: btnDisabled ? 'red' : '' }}
            >
              {spinner && <div className={spinnerStyles.spinner} />}
              Əlavə et
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FormProductPage
