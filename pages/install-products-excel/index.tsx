import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { postImportProductsFx } from '@/app/api/products'
import Layout from '@/components/layout/Layout'
import { getLocalStorageUser } from '@/localStorageUser'
import styles from '@/styles/form__string/index.module.scss'
import Spinner from '@/components/modules/Spinner/Spinner'

function FormString() {
  interface Product {
    azencoCode: string
    name: string
    price: string
    unit: string
  }

  interface MyTableComponentProps {
    valuesString: string
    test?: boolean
  }

  const MyTableComponent: React.FC<MyTableComponentProps> = ({
    valuesString,
    test = false,
  }) => {
    const products: Product[] = valuesString ? JSON.parse(valuesString) : []

    if (!test && products.length >= 100) {
      return (
        <h1>
          <h1 className={styles.table__container__error}>
            100-ə qədər material göndərin
          </h1>
        </h1>
      )
    }

    return (
      <div className={styles.table__container}>
        {!test && <h2>materialların ümumi sayı {products?.length}</h2>}
        <table>
          <thead>
            <tr>
              <th className={styles.azencoCode}>Azenco Kod</th>
              <th className={styles.materialName}>Materialın adı</th>
              <th className={styles.unit}>Vahid</th>
              <th className={styles.price}>Qiymet</th>
            </tr>
          </thead>
          <tbody>
            {products[0]?.azencoCode &&
              products.map((item) => (
                <tr key={item.azencoCode}>
                  <td className={styles.azencoCode}>{item.azencoCode}</td>
                  <td className={styles.materialName}>{item.name}</td>
                  <td className={styles.unit}>{item.unit}</td>
                  <td className={styles.price}>{item.price}</td>
                </tr>
              ))}

            {test && (
              <tr>
                <td className={styles.azencoCode}>M00011278</td>
                <td className={styles.materialName}>Açar 30x32</td>
                <td className={styles.unit}>ədəd</td>
                <td className={styles.price}>10.99</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  const admin = getLocalStorageUser().usernameStorage

  const [dataString, setDataString] = useState('')
  const [dataSpinner, setDataSpinner] = useState(false)
  const [resultString, setResultString] = useState('')
  const [resultSpinner, setResultSpinner] = useState(false)
  const [isResult, setIsResult] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDataString(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parseDataToJSON = (input: string) => {
      setDataSpinner(true)
      const lines = input.trim().split('\n')

      // Исправленная функция парсинга данных
      const items = lines.map((line) => {
        const parts = line.split('\t')

        const azencoCode = parts[0]
        const name = parts[1]
        const unit = parts[2]
        const formatNumberPrice = parts[3]?.replace(',', '.')
        const price = +formatNumberPrice

        if (!azencoCode || !name || !price || !unit) {
          toast.warning('Yanlış məlumat formatı')
          setResultString('')
          setIsResult(false)
          setTimeout(() => setDataSpinner(false), 2000)
        } else {
          setTimeout(() => {
            setDataSpinner(false)
            setIsResult(true)
          }, 2000)

          return {
            azencoCode,
            name,
            price,
            unit,
          }
        }
      })

      return JSON.stringify(items, null, 0) // Удалил замену кавычек
    }

    const formattedString = parseDataToJSON(dataString)
    console.log('formattedString')
    if (JSON.parse(formattedString).length >= 100) {
      toast.error('100-ə qədər material göndərin')
      setResultString('')
      setIsResult(false)
      setDataSpinner(false)
    } else {
      setResultString(formattedString)
    }
  }

  console.log('resultString')
  console.log(resultString)

  const router = useRouter()

  const handleImport = async () => {
    console.log(resultString)
    setResultSpinner(true)
    if (!resultString.length) {
      toast.error('Məlumat yoxdur')
      setResultSpinner(false)
      return
    }

    try {
      const result = await postImportProductsFx({ admin, str: resultString })
      console.log(result)
      if (result.message === 'uğurla tamamlandı') {
        toast.success('Məhsullar uğurla quraşdırıldı')
        router.push('/products')
      } else {
        toast.error(`Xəta baş verdi. ${result.message}`)
      }
    } catch (error) {
      console.error('error:', error)
    } finally {
      setResultSpinner(false)
    }
  }

  return (
    <Layout title={'Kontaktlar'}>
      <div className={styles.form__container}>
        <h1>
          excel-də cədvəl yaradın və onun məlumat sahəsini köçürün bu nümunəyə
          görə
        </h1>
        <MyTableComponent test={true} valuesString={''} />
        <form onSubmit={handleSubmit}>
          <textarea
            value={dataString}
            placeholder="excel-də cədvəlinizi kopyalayın və bura yapışdırın... M00011278	Açar 30x32	ədəd	10.99"
            onChange={handleInputChange}
            rows={10}
            cols={50}
          />
          <br />
          <br />
          <div>sonra yoxlama düyməsini sıxın</div>

          <button
            className={styles.btn__red}
            onClick={() => {
              setDataString('')
              setResultString('')
              setIsResult(false)
            }}
            disabled={!dataString && !resultString}
          >
            poz
          </button>
          <button type="submit" disabled={!dataString}>
            {dataSpinner ? <Spinner /> : 'yoxlamaq'}
          </button>
        </form>

        <div className={styles.import__button}>
          {isResult && (
            <button disabled={!dataString} onClick={handleImport}>
              {resultSpinner ? <Spinner /> : 'məhsulları quraşdırın bazaya'}
            </button>
          )}
        </div>

        {isResult && (
          <div className={styles.result__container}>
            <h2>Nəticə:</h2>

            <MyTableComponent valuesString={resultString} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default FormString
