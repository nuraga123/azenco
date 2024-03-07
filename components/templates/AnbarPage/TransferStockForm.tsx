import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { useRouter } from 'next/router'
import { $transfer } from '@/context/transfer'
import Spinner from '@/components/modules/Spinner/Spinner'
import { IOrderTransferProductId } from '@/types/anbar'
import { numberMetricFormat } from '@/utils/anbar'
import { productsAnbarSendToUserFx } from '@/app/api/anbar'
import styles from '@/styles/anbar/index.module.scss'

const TransferStockForm = () => {
  const router = useRouter()
  const transferState = useStore($transfer)
  console.log(transferState)

  const transferMaxStock: number = +transferState?.product?.stock

  const [formData, setFormData] = useState<{ quantity: number }>({
    quantity: 0,
  })

  const [error, setError] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)

  const handleChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [changeEvent.target.name]: changeEvent.target.value,
    })
  }

  const handleSubmit = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()
    setSpinner(true)

    if (formData.quantity <= 0) {
      setError('Количество товара должно быть больше нуля')
      return
    }

    if (
      formData.quantity > +transferState?.product?.stock
        ? transferState.product.stock
        : 0
    ) {
      setError(`
        Нельзя перевести более ${transferMaxStock} единиц товара за один раз
      `)
      return
    }

    const transferForm: IOrderTransferProductId = {
      ...transferState,
      productId: +transferState.product.productId,
      quantity: +formData.quantity,
    }

    console.log(transferForm)
    try {
      const result = await productsAnbarSendToUserFx({
        url: 'anbar/transfer-stock',
        transfer: transferForm,
      })
      setSpinner(false)
      setError('')
      setFormData({ quantity: formData.quantity })
      router.push('/anbar')

      toast.success(result.message)
      console.log(result.message)
    } catch (error) {
      console.error('Ошибка при переводе товара между амбарами:', error)
      toast.error('Ошибка при переводе товара между амбарами')
      setError('Ошибка при переводе товара между амбарами')
    }
  }

  const sum = (stok: number, price: number | undefined) => {
    if (stok && price) {
      return +stok * +price
    }
    return 0
  }

  if (transferState.fromUserId === 0) {
    router.push('/anbar')
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
          <i>Məhsulun adı:</i>
        </div>
        <div>
          <h3>{transferState?.product?.name}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Ölçü vahidi: </i>
        </div>
        <div>
          <h3>{transferState.product.unit}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Maksimal miqdar</i>
        </div>
        <div>
          <h3>{numberMetricFormat(transferMaxStock)}</h3>
        </div>
      </div>
      <div className={styles.form__item}>
        <div>
          <i>Məhsul qiymət: </i>
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

      <div style={{ borderTop: '1px solid', marginTop: '10px' }}>
        <h2>Umumi qiymet:</h2>
        <br />
        <br />
        <div>
          <h3 style={{ textAlign: 'center' }}>
            {numberMetricFormat(
              sum(formData.quantity, +transferState?.product?.price)
            )}{' '}
            m
          </h3>
        </div>
      </div>

      {error && <p className={styles.error_message}>{error}</p>}

      <div style={{ borderTop: '1px solid', marginTop: '10px' }}>
        {spinner ? (
          <Spinner />
        ) : (
          <button type="submit" disabled={disabledBtn}>
            {'sifariş etmək'.toLocaleUpperCase()}
          </button>
        )}
      </div>
    </form>
  )
}

export default TransferStockForm
