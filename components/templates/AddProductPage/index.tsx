import { useState } from 'react'
import { addProductFx } from '@/app/api/products'
import styles from '@/styles/products/index.module.scss'

const AddProductPage = () => {
  console.log({
    azenco__code: '000000925ddd',
    name: 'Balış ddd',
    type: 'yataq dəsti',
    unit: 'ədəd',
    price: 6.71,
    images:
      'https://homeconcept.ru/upload/resize_cache/iblock/f6d/750_750_0/Therapy-Goose-Feather-Pillow-271190-1-h.jpg',
  })

  const [azenco__code, setAzenco__code] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [images, setImages] = useState<string>('')

  const dataInputsProduct = {
    azenco__code,
    name,
    type,
    unit,
    price,
    images,
  }

  const addProductAF = async () => {
    try {
      const result = await addProductFx({
        url: '/products/add',
        new__product: dataInputsProduct,
      })

      console.log(result)
      return result
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <form className={styles.form} onSubmit={(e) => console.log(e)}>
      <h1 className={styles.title}>Add Product Page</h1>
      <div className={styles.form__container}>
        <div className={styles.container}>
          <div>Azenco Code</div>
          <input
            type="text"
            value={azenco__code}
            onChange={(e) => setAzenco__code(e.target.value)}
          />
        </div>

        <div>
          <div>name</div>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <div>type</div>
          <input type="text" onChange={(e) => setType(e.target.value)} />
        </div>

        <div>
          <div>unit</div>
          <input type="text" onChange={(e) => setUnit(e.target.value)} />
        </div>

        <div>
          <div>price</div>
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
          <div>images</div>
          <input type="text" onChange={(e) => setImages(e.target.value)} />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={styles.add__button}
          onClick={addProductAF}
        >
          Add Product
        </button>
      </div>
    </form>
  )
}

export default AddProductPage
