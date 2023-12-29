/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { updateTotalPrice, removeItemFromCart } from '@/utils/shopping-cart'
import { useStore } from 'effector-react'
import { removeFromCartFx } from '@/app/api/shopping-cart'

interface IUsePrice {
  count: number
  partId: number
  initialPrice: number
}

export const usePrice = ({ count, partId, initialPrice }: IUsePrice) => {
  const spinner = useStore(removeFromCartFx.pending)
  const [price, setPrice] = useState<number>(initialPrice)

  useEffect(() => {
    setPrice(Number(price) * Number(count))
  }, [])

  useEffect(() => {
    console.log(price)
    updateTotalPrice(Number(price), partId)
  }, [price])

  function increasePrice() {
    const result = Number(price) + Number(initialPrice)
    setPrice(Number(result.toFixed(2)))
  }

  const decreasePrice = () => {
    const result = Number(price) - Number(initialPrice)
    setPrice(Number(result.toFixed(2)))
  }

  const deleteCartItem = () => removeItemFromCart(partId)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}
