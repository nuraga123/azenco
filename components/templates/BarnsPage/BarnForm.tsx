import React, { useState } from 'react'
import styles from '@/styles/barn/form/index.module.scss'
import { postAddStocksBarn } from '@/app/api/barn'
import { IStocksBarn } from '@/types/barn'

interface IBarnFormData {
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  newStock: number
  usedStock: number
  brokenStock: number
}

const BarnForm: React.FC<{ barnId: number }> = ({
  barnId,
}: {
  barnId: number
}) => {
  // Состояние для полей формы
  const [formData, setFormData] = useState<IBarnFormData>({
    userSelectedDate: '',
    fromLocation: '',
    toLocation: '',
    newStock: 0,
    usedStock: 0,
    brokenStock: 0,
  })

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'userSelectedDate' ? value.toString() : value,
    })
  }

  // Обработчик отправки формы
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const stocks: IStocksBarn = {
      userSelectedDate: formData.userSelectedDate,
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      newStock: formData.newStock,
      usedStock: formData.usedStock,
      brokenStock: formData.brokenStock,
      barnId,
    }

    await postAddStocksBarn(stocks)
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form_group}>
        <label>Hərəkət növü</label>
        <h3>{'GƏLİR (materialın miqdarını artıran hərəkət - ПРИХОД)'}</h3>
      </div>

      <label htmlFor="userSelectedDate">Tarix:</label>
      <input
        type="datetime-local"
        id="userSelectedDate"
        name="userSelectedDate"
        value={formData.userSelectedDate}
        onChange={handleInputChange}
        required
      />

      <div className={styles.form_group}>
        <label>Məkan "Haradan"</label>
        <input
          type="text"
          name="fromLocation"
          value={formData.fromLocation}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.form_group}>
        <label>Məkan "Haraya"</label>
        <input
          type="text"
          name="toLocation"
          value={formData.toLocation}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.form_group}>
        <label>Yeni material miqdarı</label>
        <input
          type="number"
          name="newStock"
          value={formData.newStock}
          onChange={handleInputChange}
          min="0"
          required
        />
      </div>

      <div className={styles.form_group}>
        <label>İstifadə olunmuş materialın miqdarı</label>
        <input
          type="number"
          name="usedStock"
          value={formData.usedStock}
          onChange={handleInputChange}
          min="0"
          required
        />
      </div>

      <div className={styles.form_group}>
        <label>Zədələnmiş materialın miqdarı</label>
        <input
          type="number"
          name="brokenStock"
          value={formData.brokenStock}
          onChange={handleInputChange}
          min="0"
          required
        />
      </div>

      <button type="submit" className={styles.submit_button}>
        Göndər
      </button>
    </form>
  )
}

export default BarnForm
