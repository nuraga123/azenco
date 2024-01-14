import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addProductFx } from '@/app/api/products'
import { DataNewProduct } from '@/types/products'
import styles from '@/styles/products/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const FormProductPage = () => {
  const router = useRouter()
  const [spinner, setSpinner] = useState<boolean>(false)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

  // azenco__code
  const [azenco__code, setAzenco__code] = useState<string>('')
  const [azenco__codeErrorMessage, setAzenco__codeErrorMessage] =
    useState<string>('')

  // name
  const [name, setName] = useState<string>('')
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('')

  // type
  const [type, setType] = useState<string>('')
  const [typeErrorMessage, setTypeErrorMessage] = useState<string>('')

  // unit
  const [unit, setUnit] = useState<string>('')
  const [unitErrorMessage, setUnitErrorMessage] = useState<string>('')

  // price
  const [price, setPrice] = useState<string>('')
  const [priceErrorMessage, setPriceErrorMessage] = useState<string>('')

  const [images, setImages] = useState<string>('')

  const dataInputsProduct = {
    azenco__code,
    name,
    type,
    unit,
    price,
    images,
  }

  const dataInputsProductError = [
    azenco__codeErrorMessage,
    nameErrorMessage,
    typeErrorMessage,
    unitErrorMessage,
    priceErrorMessage,
  ]

  const addProductAF = async (dataNewProduct: DataNewProduct) => {
    try {
      setSpinner(true)
      const result = await addProductFx({
        url: '/products/add',
        new__product: dataNewProduct,
      })

      console.log(dataInputsProductError.length)

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(dataInputsProduct)

    if (
      dataInputsProduct.azenco__code.length >= 3 &&
      dataInputsProduct.name &&
      dataInputsProduct.type &&
      dataInputsProduct.unit &&
      dataInputsProduct.price
    ) {
      setBtnDisabled(false)
      addProductAF(dataInputsProduct)
    }
  }

  useEffect(() => {
    validateInput()
  }, [dataInputsProduct])

  const validateInput = () => {
    if (
      dataInputsProduct.azenco__code.length >= 3 &&
      dataInputsProduct.name.length >= 3 &&
      dataInputsProduct.type &&
      dataInputsProduct.unit &&
      dataInputsProduct.price
    ) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }

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
        </div>

        <div className={styles.container}>
          <div>Material Adi *</div>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div>Növü *</div>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div>Ölçü Vahidi *</div>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div>{`Qiymət (manat) *`}</div>
          <input
            value={price}
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div>{`Şəkil (isteğe bağlı sahə)`}</div>
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
