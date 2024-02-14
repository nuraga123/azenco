import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { productsAnbarSendToUserFx } from '@/app/api/anbar'
import styles from '@/styles/anbar/index.module.scss'
import { $transfer } from '@/context/transfer'
import { ITransfer } from '@/types/anbar'
import { numberMetricFormat } from '@/utils/anbar'
import { useRouter } from 'next/router'

const TransferStockForm = () => {
  const transferState = useStore($transfer)
  const router = useRouter()

  useEffect(() => {
    // Если объект пустой, перенаправляем пользователя на страницу `/anbar`
    if (transferState.toUsername === '') {
      router.push(`/anbar`)
    }
  }, [router, transferState])

  const transferMAXSTOCK = +transferState?.product?.stock

  const [formData, setFormData] = useState<{ quantity: number }>({
    quantity: 0,
  })

  const [error, setError] = useState('')

  const handleChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [changeEvent.target.name]: changeEvent.target.value,
    })
  }

  const handleSubmit = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()

    if (formData.quantity <= 0) {
      setError('Количество товара должно быть больше нуля')
      return
    }

    if (
      formData.quantity > +transferState?.product?.stock
        ? transferState.product.stock
        : 0
    ) {
      setError('Нельзя перевести более 5 единиц товара за один раз')
      return
    }

    const transferForm: ITransfer = {
      ...transferState,
      quantity: +formData.quantity,
    }

    try {
      await productsAnbarSendToUserFx({
        url: 'anbar/transfer-stock',
        transfer: transferForm,
      })

      toast.success('Товар успешно переведен между амбарами!')
      setFormData({ quantity: formData.quantity })
      setError('')
    } catch (error) {
      console.error('Ошибка при переводе товара между амбарами:', error)
      toast.error('Ошибка при переводе товара между амбарами')
      setError('Ошибка при переводе товара между амбарами')
    }
  }

  const sum = (stok: number, price: number | undefined) => {
    if (stok && price) {
      return stok * price
    }

    return 0
  }

  return (
    <form className={styles.transfer_stock_form} onSubmit={handleSubmit}>
      <div className={styles.form__item}>
        <div>
          <i>Göndərən:</i>
        </div>
        <div>
          <h3>{transferState.fromUsername}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Alıcı:</i>
        </div>
        <div>
          <h3>{transferState.toUsername}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Məhsul name:</i>
        </div>
        <div>
          <h3>{transferState?.product?.name}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Maksimal stok</i>
        </div>
        <div>
          <h3>{numberMetricFormat(transferMAXSTOCK)}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Məhsul price:</i>
        </div>
        <div>
          <h3>{numberMetricFormat(transferState?.product?.price)}</h3>
        </div>
      </div>

      <div>
        <h2>Miqdarı:</h2>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>

      <div>
        <h2>Umumi qiymet:</h2>
        <div>
          <h3>
            {numberMetricFormat(
              sum(formData.quantity, +transferState?.product?.price)
            )}
          </h3>
        </div>
      </div>

      {error && <p className={styles.error_message}>{error}</p>}

      <button type="submit">G Ö N D Ə R I N</button>
    </form>
  )
}

export default TransferStockForm
