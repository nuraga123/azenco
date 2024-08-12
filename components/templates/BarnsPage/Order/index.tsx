import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { createNewOrder } from '@/app/api/order'
import { getBarnByUserId } from '@/app/api/barn'
import { IBarnItem, IBarnResponse } from '@/types/barn'
import BarnTable from '@/components/modules/BarnsPage/Order/BarnTable'
import OrderModal from '@/components/modules/BarnsPage/Order/OrderModal'
import Spinner from '@/components/modules/Spinner/Spinner'

const BarnPageOrder = ({ userId }: { userId: number }) => {
  console.log('userId')
  console.log(userId)
  const [barns, setBarns] = useState<IBarnResponse>({
    barns: [],
    message: '',
    error_message: '',
  })

  console.log(barns)
  const [loading, setLoading] = useState(true)
  const [orderBarn, setOrderBarn] = useState<IBarnItem | null>(null)
  const [toggleModal, setToggleModal] = useState(false)
  const [newStock, setNewStock] = useState('')
  const [usedStock, setUsedStock] = useState('')
  const [brokenStock, setBrokenStock] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const loadBarn = async () => {
      try {
        const data = await getBarnByUserId(11)
        if (data) {
          setLoading(false)
          console.log(data)
          return setBarns(data)
        }
      } catch (error) {
        toast.warning(error as string)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    loadBarn()
  }, [barns])

  const handleOrderClick = (barn: IBarnItem) => {
    setOrderBarn(barn)
    setToggleModal(true)
  }

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createNewOrder({
        barnId: orderBarn!.id,
        newStock: +newStock,
        usedStock: +usedStock,
        brokenStock: +brokenStock,
        clientId: 0,
        clientLocation: '',
      })
      toast.success('Sifariş təsdiqləndi!')
      setToggleModal(false)
      setNewStock('')
      setUsedStock('')
      setBrokenStock('')
    } catch (error) {
      toast.error('Sifarişdə xəta baş verdi.')
    }
  }

  const handleNewStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStock(e.target.value)
    validateForm()
  }

  const handleUsedStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsedStock(e.target.value)
    validateForm()
  }

  const handleBrokenStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrokenStock(e.target.value)
    validateForm()
  }

  const validateForm = () => {
    const newStockValue = Number(newStock)
    const usedStockValue = Number(usedStock)
    const brokenStockValue = Number(brokenStock)
    const isAnyFieldEmpty = !newStock || !usedStock || !brokenStock
    const isTotalQuantityValid =
      newStockValue + usedStockValue + brokenStockValue > 0
    setIsDisabled(isAnyFieldEmpty || !isTotalQuantityValid)
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {barns?.barns.length && (
            <BarnTable barns={barns.barns} onOrderClick={handleOrderClick} />
          )}
          <OrderModal
            orderBarn={orderBarn || null}
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            handleOrderSubmit={handleOrderSubmit}
            newStock={newStock}
            usedStock={usedStock}
            brokenStock={brokenStock}
            handleNewStockChange={handleNewStockChange}
            handleUsedStockChange={handleUsedStockChange}
            handleBrokenStockChange={handleBrokenStockChange}
            isDisabled={isDisabled}
          />
        </>
      )}
    </div>
  )
}

export default BarnPageOrder
