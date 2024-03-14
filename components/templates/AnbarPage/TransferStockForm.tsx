import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { $transfer } from '@/context/transfer'
import Spinner from '@/components/modules/Spinner/Spinner'
import { IOrderTransfer, IOrderTransferProductId } from '@/types/anbar'
import { numberMetricFormat } from '@/utils/anbar'
import { productsAnbarSendToUserFx } from '@/app/api/anbar'
import styles from '@/styles/anbar/index.module.scss'
import {
  getLocalStorageAnbar,
  deleteLocalStorageAnbar,
} from '@/localStorageAnbar'

const TransferStockForm = () => {
  const router = useRouter()
  const transferState = useStore($transfer)
  const transferStorege: IOrderTransfer = JSON.parse(getLocalStorageAnbar())
  const transferData: IOrderTransfer =
    transferState.fromUserId === 0 ? transferStorege : transferState

  const [formData, setFormData] = useState<{ quantity: string }>({
    quantity: '0',
  })

  const [error, setError] = useState('')
  const [spinner, setSpinner] = useState(false)
  const transferMaxStock: number = +transferData?.product?.stock

  const handleChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = changeEvent.target

    if (transferData.product.unit === 'ədəd') {
      setFormData({
        ...formData,
        [name]: value,
      })
      return
    }
  }

  const handleSubmit = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()
    setSpinner(true)

    const quantity = +formData.quantity

    if (quantity <= 0) {
      setError('Количество товара должно быть больше нуля')
      setSpinner(false)
      return
    }

    if (quantity > transferMaxStock) {
      setError(
        `Нельзя перевести более ${transferMaxStock} единиц товара за один раз`
      )
      setSpinner(false)
      return
    }

    const transferForm: IOrderTransferProductId = {
      ...transferData,
      productId: +transferData.product.productId,
      quantity,
    }

    try {
      const result = await productsAnbarSendToUserFx({
        url: 'anbar/transfer-stock',
        transfer: transferForm,
      })

      setSpinner(false)
      setError('')
      deleteLocalStorageAnbar()
      toast.success(result.message)
      router.push('/anbars')
    } catch (error) {
      console.error('Ошибка при переводе товара между амбарами:', error)
      toast.error('Ошибка при переводе товара между амбарами')
      setError('Ошибка при переводе товара между амбарами')
    }
  }

  const calculateTotalPrice = () => {
    const { quantity } = formData
    const { price } = transferState?.product || {}
    return numberMetricFormat(+quantity * +price)
  }

  if (transferState.fromUserId === 0) {
    router.push('/anbars')
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
          <i>Ölçü vahidi:</i>
        </div>
        <div>
          <h3>{transferState.product.unit}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Maksimal miqdar:</i>
        </div>
        <div>
          <h3>{numberMetricFormat(transferMaxStock)}</h3>
        </div>
      </div>

      <div className={styles.form__item}>
        <div>
          <i>Məhsul qiymət:</i>
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
          <h3 style={{ textAlign: 'center' }}>{calculateTotalPrice()} m</h3>
        </div>
      </div>

      {error && <p className={styles.error_message}>{error}</p>}

      <div style={{ borderTop: '1px solid', marginTop: '10px' }}>
        {spinner ? (
          <Spinner />
        ) : (
          <button type="submit">{'sifariş etmək'.toLocaleUpperCase()}</button>
        )}
      </div>
    </form>
  )
}

export default TransferStockForm
