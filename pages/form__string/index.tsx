import { postImportProductsFx } from '@/app/api/products'
//import CopyElement from '@/components/elements/CopyElement'
import Layout from '@/components/layout/Layout'
import { getLocalStorageUser } from '@/localStorageUser'
import { ChangeEvent, FormEvent, useState } from 'react'

function FormString() {
  const admin = getLocalStorageUser().usernameStorage

  const [dataString, setDataString] = useState('')
  const [resultString, setResultString] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDataString(e?.target?.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    const parseDataToJSON = (input: string) => {
      const lines = input?.trim()?.split('\n')

      // Исправленная функция парсинга данных
      const items = lines?.map((line) => {
        const parts = line.split('\t')
        const name = parts[0]
        const azencoCode = parts[1]
        const price = parseFloat(parts[2]?.replace(',', '.'))
        const type = parts[3] || 'digər' // По умолчанию 'digər', если тип не указан
        const unit = parts[4]

        return {
          name,
          azencoCode,
          price,
          type,
          unit,
          img: '',
        }
      })
      return JSON.stringify(items, null, 0)?.replace(/"/g, '\\"')
    }

    const formattedString = parseDataToJSON(dataString)
    setResultString(formattedString)
  }
  console.log(resultString)
  const handleCopyClick = async () => {
    try {
      debugger
      await navigator.clipboard.writeText('ddd')
      alert('Текст скопирован в буфер обмена')
    } catch (err) {
      alert('Не удалось скопировать текст')
      console.log('Не удалось скопировать текст: ', err)
    }
  }

  const handleImport = async () => {
    if (!resultString.length) alert('пустая строка')
    try {
      const result = await postImportProductsFx({ admin, str: resultString })
      alert('Import successful:')
      console.log('Import successful:', result)
    } catch (error) {
      console.error('error:', error)
    }
  }

  return (
    <Layout title={'Kontaktlar'}>
      <form onSubmit={handleSubmit}>
        <h1>Format string</h1>
        <textarea
          value={dataString}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
        <button type="submit">Gönder</button>
      </form>
      {resultString && (
        <div>
          <h2>Результат:</h2>
          <pre>{resultString}</pre>
          <button onClick={handleCopyClick}>copy</button>
        </div>
      )}

      <div>
        <button onClick={handleImport}>установить продукты</button>
      </div>
    </Layout>
  )
}

export default FormString
