import { postImportProductsFx } from '@/app/api/products'
// import CopyElement from '@/components/elements/CopyElement'
import Layout from '@/components/layout/Layout'
import { getLocalStorageUser } from '@/localStorageUser'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/form__string/index.module.scss'

function FormString() {
  const admin = getLocalStorageUser().usernameStorage

  const [dataString, setDataString] = useState('')
  const [resultString, setResultString] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDataString(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parseDataToJSON = (input: string) => {
      const lines = input.trim().split('\n')

      // Исправленная функция парсинга данных
      const items = lines.map((line) => {
        const parts = line.split('\t')
        const azencoCode = parts[0]
        const name = parts[1]
        const price = parseFloat(parts[2].replace(',', '.'))
        const unit = parts[3]
        const type = parts[4] || 'digər' // По умолчанию 'digər', если тип не указан

        return {
          azencoCode,
          name,
          price,
          unit,
          type,
          img: '',
        }
      })
      return JSON.stringify(items, null, 0) // Удалил замену кавычек
    }

    const formattedString = parseDataToJSON(dataString)
    setResultString(formattedString)
  }

  console.log(resultString)

  const handleImport = async () => {
    if (!resultString.length) return alert('пустая строка')
    try {
      const result = await postImportProductsFx({ admin, str: resultString })
      console.log(result)
      alert('Import successful:')
      console.log('Import successful:', result)
    } catch (error) {
      console.error('error:', error)
    }
  }

  return (
    <Layout title={'Kontaktlar'}>
      <div className={styles['form-container']}>
        <form onSubmit={handleSubmit}>
          <h1>Format string</h1>
          <h2>{`1) AzencoCode; 2) Materialin adi; 3) Qiymet; 4) Vahid; 5)Növü, 6)Şəkil linki`}</h2>
          <h3>
            {`Məsələn: 199888 qayka M 90 10.77 ədəd qayka 
            https://нордком-карелия.рф/img/price/400_400/gajka_m_90_gost_1060594.jpg`}
          </h3>
          <br />

          <p>
            {`azencoCode	materialın adı	Qiymet	Vahid	növü
M00011278	3200x12000x2800 iki otaqlı dəhlizli konteyner	10771,57	ədəd	Konteyner`}
          </p>

          <textarea
            value={dataString}
            onChange={handleInputChange}
            rows={10}
            cols={50}
          />
          <button type="submit">Gönder</button>
        </form>

        {resultString && (
          <div className={styles['result-container']}>
            <h2>Nəticə:</h2>

            <textarea
              value={resultString}
              className={styles.textarea}
              readOnly
            />
          </div>
        )}

        <div className={styles['import-button']}>
          <button onClick={handleImport}>məhsulları quraşdırın</button>
        </div>
      </div>
    </Layout>
  )
}

export default FormString
