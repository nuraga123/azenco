import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { addAnbarProductFx } from '@/app/api/barn'
import ProductCard from '@/components/modules/BarnsPage/ProductsCard'
import Spinner from '@/components/modules/Spinner/Spinner'
import Modal from '@/components/modules/BarnsPage/Modal'
import { IProduct } from '@/types/products'

import SearchContainer from '@/components/modules/BarnsPage/SearchContainer'
import { useStore } from 'effector-react'
import { $products } from '@/context/barns'
import styles from '@/styles/anbar/add_form.module.scss'

const CreateFormBarn = () => {
  const searchProducts = useStore($products)

  const [spinner, setSpinner] = useState<boolean>(false)

  const [error, setError] = useState<string>('')

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [selectedProduct, setSelectedProduct] = useState<IProduct>({
    id: 0,
    name: '',
    type: '',
    price: +'',
    unit: '',
    azencoCode: '',
    img: '',
    createdAt: '',
    updatedAt: '',
  })

  const [username, setUsername] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')

  const handleModalSubmit = async () => {
    setSpinner(true)
    console.log('Имя пользователя:', username)
    console.log('ID продукта:', selectedProduct.id)
    console.log('Количество товара:', quantity)

    if (!!username && selectedProduct?.id && !!quantity && !isNaN(+quantity)) {
      const result = await addAnbarProductFx({
        url: '/barns/add',
        username,
        stock: Number(quantity),
        productId: +selectedProduct.id,
      })

      console.log('result')
      console.log(result)

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

      setError(result.error_message)
    }
  }

  console.log(searchProducts)

  return (
    <div>
      <SearchContainer />

      {spinner ? (
        <Spinner />
      ) : (
        <div className={styles.product_list}>
          {searchProducts?.length ? (
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
        product={selectedProduct}
        username={username}
        quantity={quantity}
        setUsername={setUsername}
        onClose={() => setModalOpen(false)}
        setQuantity={setQuantity}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}

export default CreateFormBarn
