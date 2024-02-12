import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import styles from '@/styles/anbar/index.module.scss'

export default function AddToAnbarForm() {
  const [formData, setFormData] = useState({
    username: '',
    productId: '',
    stock: 0,
  })

  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.username.trim()) {
      setError('Введите имя пользователя')
      return
    }

    if (!formData.productId.trim()) {
      setError('Введите ID товара')
      return
    }

    if (formData.stock <= 0) {
      setError('Количество товара должно быть больше нуля')
      return
    }

    try {
      await axios.post('http://your-backend-url/anbar/add', formData)
      alert('Товар успешно добавлен в амбар!')
      setFormData({
        username: '',
        productId: '',
        stock: 0,
      })
      setError('')
    } catch (error) {
      console.error('Ошибка при добавлении товара в амбар:', error)
      alert('Ошибка при добавлении товара в амбар')
      setError('Ошибка при добавлении товара в амбар')
    }
  }

  return (
    <form className={styles.add_to_anbar_form} onSubmit={handleSubmit}>
      <label>
        Имя пользователя:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        ID товара:
        <input
          type="text"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
        />
      </label>
      <label>
        Количество:
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
      </label>
      {error && <p className={styles.error_message}>{error}</p>}
      <button type="submit">Добавить в амбар</button>
    </form>
  )
}
