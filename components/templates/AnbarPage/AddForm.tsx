import React, { useState } from 'react'
import SearchBar from '@/components/modules/AnbarPage/SearchBar'
import ProductCard from '@/components/modules/AnbarPage/ProductCard'
import Modal from '@/components/modules/AnbarPage/Modal'
import Spinner from '@/components/modules/Spinner/Spinner'
import { getSearchNameProductFx } from '@/app/api/products'
import { IProduct } from '@/types/products'
import styles from '@/styles/anbar/add_form.module.scss'

const AddForm = () => {
  const [spinner, setSpinner] = useState<boolean>(false)

  const [searchProducts, setSearchProducts] = useState<IProduct[]>([])
  const [searchProductName, setSearchProductName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [selectedProduct, setSelectedProduct] = useState<IProduct>({
    id: 0,
    name: '',
    type: '',
    price: '',
    unit: '',
    azenco__code: '',
    images: '',
    createdAt: '',
    updatedAt: '',
  })

  const [username, setUsername] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)

  const handleSearch = async () => {
    setSpinner(true)
    if (searchProductName.trim() === '') {
      setSpinner(false)
      setError('Введите название продукта')
    } else {
      try {
        const result = await getSearchNameProductFx({
          url: 'products/search-word',
          search_word: searchProductName,
        })

        if (result.length) {
          setSpinner(false)
          setError('')
          setSearchProducts(result)
        } else {
          setSearchProductName('')
          setError(`${searchProductName} нет в базе данных`)
        }
      } catch (error) {
        setSpinner(false)
        console.log(error)
        setError('Произошла ошибка при загрузке данных')
      } finally {
        setSpinner(false)
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSearch()
  }

  const handleModalSubmit = () => {
    console.log('Имя пользователя:', username)
    console.log('ID продукта:', selectedProduct.id)
    console.log('Количество товара:', quantity)
    setSelectedProduct({} as IProduct)
    setQuantity(0)
    setUsername('')
    setModalOpen(false)
  }

  return (
    <div>
      <SearchBar
        value={searchProductName}
        onChange={(e) => setSearchProductName(e.target.value)}
        onSubmit={handleSubmit}
      />

      {spinner ? (
        <Spinner />
      ) : (
        <div className={styles.product_list}>
          {searchProducts.length ? (
            searchProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={(product) => {
                  setSelectedProduct(product)
                  setModalOpen(true)
                }}
              />
            ))
          ) : (
            <span className={styles.error}>{error}</span>
          )}
        </div>
      )}

      <Modal
        isOpen={modalOpen && !!selectedProduct}
        onClose={() => setModalOpen(false)}
        product={selectedProduct || {}}
        username={username}
        setUsername={setUsername}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}

export default AddForm
