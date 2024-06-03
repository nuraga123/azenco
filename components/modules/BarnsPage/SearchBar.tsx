import React from 'react'
import styles from '@/styles/anbar/add_form.module.scss'

// Интерфейс для свойств компонента SearchBar
interface SearchBarProps {
  filter: string
  value: string
  priceMin: number
  priceMax: number
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPriceMinChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPriceMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onApplyPrice: () => void
}

// Компонент для панели поиска
const SearchBar: React.FC<SearchBarProps> = ({
  filter,
  value,
  priceMin,
  priceMax,
  onFilterChange,
  onValueChange,
  onPriceMinChange,
  onPriceMaxChange,
  onSearchSubmit,
  onApplyPrice,
}) => (
  <form onSubmit={onSearchSubmit} className={styles.form}>
    {/* Секция выбора фильтра и поиска */}
    <div className={styles.filterSection}>
      <select
        value={filter}
        onChange={onFilterChange}
        className={styles.select}
      >
        <option value="name">По имени</option>
        <option value="azencoCode">По коду Azenco</option>
        <option value="type">По типу</option>
        <option value="unit">По единице измерения</option>
      </select>
      <input
        type="text"
        value={value}
        onChange={onValueChange}
        placeholder="Введите значение для поиска"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Искать
      </button>
    </div>
    {/* Секция для ввода ценового диапазона и кнопки применения */}
    <div className={styles.priceSection}>
      <input
        type="number"
        value={priceMin}
        onChange={onPriceMinChange}
        placeholder="Мин. цена"
        className={styles.range}
      />
      <input
        type="number"
        value={priceMax}
        onChange={onPriceMaxChange}
        placeholder="Макс. цена"
        className={styles.range}
      />
      <button type="button" onClick={onApplyPrice} className={styles.button}>
        Применить цену
      </button>
    </div>
  </form>
)

export default SearchBar
