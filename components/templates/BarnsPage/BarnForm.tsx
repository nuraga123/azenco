import React, { useState } from 'react'
import { postAddStocksBarn } from '@/app/api/barn'
import { IStocksBarn } from '@/types/barn'
import styles from '@/styles/barn/form/index.module.scss'

interface IBarnFormData {
  userSelectedDate: string
  fromLocation: string
  toLocation: string
  newStock: number
  usedStock: number
  brokenStock: number
}

const BarnForm: React.FC<{ barnId: number }> = ({ barnId }) => {
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
      <div className={styles.form__locations}>
        <div className={styles.form_group}>
          <label>Hansi ünvanından gəldi?</label>
          <input
            type="text"
            name="fromLocation"
            value={formData.fromLocation}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.form_group}>
          <label>Hansı ünvana çatdırılıb ?</label>
          <input
            type="text"
            name="toLocation"
            value={formData.toLocation}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className={styles.form__stocks_header}>
        <label>Material miqdarı</label>
      </div>

      <div className={styles.form__stocks}>
        <div className={styles.form_group}>
          <label>Yeni</label>
          <input
            className={styles.form_group__stocks}
            type="number"
            name="newStock"
            value={formData.newStock}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.form_group}>
          <label>İstifadə olunmuş</label>
          <input
            className={styles.form_group__stocks}
            type="number"
            name="usedStock"
            value={formData.usedStock}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.form_group}>
          <label>Zədələnmiş</label>
          <input
            className={styles.form_group__stocks}
            type="number"
            name="brokenStock"
            value={formData.brokenStock}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="userSelectedDate">Tarix:</label>
        <input
          type="datetime-local"
          id="userSelectedDate"
          name="userSelectedDate"
          value={formData.userSelectedDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className={styles.submit_button}>
        artırmaq
      </button>
    </form>
  )
}

export default BarnForm
