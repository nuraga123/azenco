import { useState, useEffect } from 'react'
import { updateTotalPrice, removeItemFromCart } from '@/utils/shopping-cart'
import { useStore } from 'effector-react'
import { removeFromCartFx } from '@/app/api/shopping-cart'

export const usePrice = (
  count: number,
  partId: number,
  initialPrice: number
) => {
  const spinner = useStore(removeFromCartFx.pending)
  const [price, setPrice] = useState<number>(initialPrice)

  useEffect(() => {
    setPrice(Number(price) * Number(count))
  }, [])

  useEffect(() => {
    updateTotalPrice(Number(price), partId)
  }, [price])

  function increasePrice() {
    const result = Number(price) + Number(initialPrice)
    setPrice(+(+result.toFixed(2)))
  }

  const decreasePrice = () => {
    const result = Number(price) - Number(initialPrice)
    setPrice(+(+result.toFixed(2)))
  }

  const deleteCartItem = () => removeItemFromCart(partId)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}
