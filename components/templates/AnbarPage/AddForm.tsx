import React, { useState } from 'react'
import { toast } from 'react-toastify'
import SearchBar from '@/components/modules/AnbarPage/SearchBar'
import ProductCard from '@/components/modules/AnbarPage/ProductCard'
import { getSearchNameWordProductFx } from '@/app/api/products'
import { addAnbarProductFx } from '@/app/api/anbar'
import { IProduct } from '@/types/products'
import styles from '@/styles/anbar/add_form.module.scss'
import { AxiosError } from 'axios'
import Spinner from '@/components/modules/Spinner/Spinner'
import Modal from '@/components/modules/AnbarPage/Modal'

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
  const [quantity, setQuantity] = useState<string>('')

  const handleSearch = async () => {
    setSpinner(true)
    if (searchProductName.trim() === '') {
      setSpinner(false)
      setError('Введите название продукта')
    } else {
      try {
        const result = await getSearchNameWordProductFx({
          search_word: searchProductName,
        })

        if (result.length) {
          setSpinner(false)
          setError('')
          setSearchProducts(result)
        } else {
          setSearchProductName('')
          setError(`${searchProductName} нет в базе данных`)
          toast.error(`${searchProductName} нет в базе данных`)
        }
      } catch (error) {
        setSpinner(false)
        console.log(error)
        setError('Произошла ошибка при загрузке данных')
        toast.error((error as AxiosError).message)
      } finally {
        setSpinner(false)
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSearch()
  }

  const handleModalSubmit = async () => {
    console.log('Имя пользователя:', username)
    console.log('ID продукта:', selectedProduct.id)
    console.log('Количество товара:', quantity)

    if (!!username && selectedProduct?.id && !!quantity && !isNaN(+quantity)) {
      const result = await addAnbarProductFx({
        url: '/anbar/add',
        username,
        stock: Number(quantity),
        productId: +selectedProduct.id,
      })

      if (result?.message && result?.newAnbar?.id) {
        setModalOpen(false)
        toast.success(result.message)
      }

      if (result?.message) {
        setModalOpen(false)
        toast.warning(result.message)
      }

      if (result.message) {
        setModalOpen(false)
        toast.error(result.message)
      }

      console.log(result)
    }
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
