import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { AxiosError } from 'axios'
import Image from 'next/image'

import { IBarnItem } from '@/types/barn'
import barnImg from '@/public/img/garage-icon.jpg'
import OrderModal from '@/components/modules/BarnsPage/Order/OrderModal'
import BarnTable from '@/components/modules/BarnsPage/Order/BarnTable'

import { createNewOrder } from '@/app/api/order'
import { $user } from '@/context/user'
import { getLocalStorageUser } from '@/localStorageUser'

import styles from '@/styles/barn/card/index.module.scss'

const BarnCard = ({ barn }: { barn: IBarnItem }) => {
  const { id } = useStore($user)
  const clientId: number = +getLocalStorageUser().userIdStorage || +id

  const [spinner, setSpinner] = useState(false)
  const [errorsMessageArr, setErrorsMessageArr] = useState<string[]>([])
  const [currentBarn, setCurrentBarn] = useState<IBarnItem>({} as IBarnItem)
  const [toggleModal, setToggleModal] = useState(false)
  const [newStock, setNewStock] = useState('')
  const [usedStock, setUsedStock] = useState('')
  const [brokenStock, setBrokenStock] = useState('')
  const [clientMessage, setClientMessage] = useState('')
  const [clientLocation, setClientLocation] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const handleOrderClick = (barn: IBarnItem) => {
    setCurrentBarn(barn)
    setToggleModal(true)
  }

  const resetStocks = () => {
    setNewStock('')
    setUsedStock('')
    setBrokenStock('')
    setClientLocation('')
    setClientMessage('')
  }

  const closeBtn = () => {
    resetStocks()
    setToggleModal(false)
  }

  const handleNewStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStock(e.target.value)
  }

  const handleUsedStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsedStock(e.target.value)
  }

  const handleBrokenStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrokenStock(e.target.value)
  }

  const handleClientLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientLocation(e.target.value)
  }

  const handleClientMessageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientMessage(e.target.value)
  }

  useEffect(() => {
    const validateForm = () => {
      const newStockValue = Number(newStock)
      const usedStockValue = Number(usedStock)
      const brokenStockValue = Number(brokenStock)

      const errorsArr: string[] = []

      if (+currentBarn.newStock < +newStockValue) {
        errorsArr.push('Çox yəni material götürdünüz!')
      }

      if (+currentBarn.usedStock < +usedStockValue) {
        errorsArr.push('Çox istifadəyə olunmuş material götürdünüz!')
      }

      if (+currentBarn.brokenStock < +brokenStockValue) {
        errorsArr.push('Çox yararsız material götürdünüz!')
      }

      const isTotalQuantityValid =
        +newStockValue + +usedStockValue + +brokenStockValue <= 0

      if (isTotalQuantityValid) {
        errorsArr.push('0-dan çox sifariş verməlisiniz')
      }

      if (clientLocation.length < 2) {
        errorsArr.push('Məkan ən azı 2 simvoldan ibarət olmalıdır')
      }

      setErrorsMessageArr(errorsArr)
      return errorsArr.length > 0
    }

    setIsDisabled(validateForm())
  }, [
    newStock,
    usedStock,
    brokenStock,
    clientLocation,
    currentBarn.newStock,
    currentBarn.usedStock,
    currentBarn.brokenStock,
  ])

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setSpinner(true)
      const res = await createNewOrder({
        clientId,
        clientLocation,
        clientMessage,
        barnId: currentBarn.id,
        newStock: +newStock,
        usedStock: +usedStock,
        brokenStock: +brokenStock,
      })

      if (res.message) {
        toast.success(res.message)
      }

      console.log(res)
    } catch (error) {
      toast.error((error as AxiosError).message)
    } finally {
      setSpinner(false)
      resetStocks()
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <Image src={barnImg.src} alt="barn-img" width={50} height={35} />
        <div className={styles.header}>
          {`Anbardar: `}
          <strong>{barn.username}</strong>
        </div>
      </div>
      <div className={styles.info}>
        <BarnTable barns={[barn]} onOrderClick={handleOrderClick} />
      </div>

      <div>
        <OrderModal
          barnUsername={barn.username}
          spinner={spinner}
          toggleModal={toggleModal}
          currentBarn={currentBarn}
          isDisabled={isDisabled}
          newStock={newStock}
          usedStock={usedStock}
          brokenStock={brokenStock}
          clientLocation={clientLocation}
          clientMessage={clientMessage}
          errorsMessageArr={errorsMessageArr}
          closeBtn={closeBtn}
          handleOrderSubmit={handleOrderSubmit}
          handleNewStockChange={handleNewStockChange}
          handleUsedStockChange={handleUsedStockChange}
          handleBrokenStockChange={handleBrokenStockChange}
          handleCLientLocationChange={handleClientLocationChange}
          handleClientMessageChange={handleClientMessageChange}
        />
      </div>
    </div>
  )
}

export default BarnCard
