import React from 'react'
import styles from '@/styles/anbar/add_form.module.scss'

interface SearchBarProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className={styles.form}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Введите название продукта"
      className={styles.input}
    />
    <button type="submit" className={styles.button}>
      Искать
    </button>
  </form>
)

export default SearchBar
