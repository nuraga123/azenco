import React, { useState } from 'react'
import styles from '@/styles/products/index.module.scss'

interface PriceFilterProps {
  onFilter: (priceFrom: string, priceTo: string) => void
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onFilter }) => {
  const [priceFrom, setPriceFrom] = useState<string>('0')
  const [priceTo, setPriceTo] = useState<string>('1000000')

  const handleFilterClick = () => {
    onFilter(priceFrom, priceTo)
  }

  return (
    <div className={styles.priceFilterContainer}>
      <input
        type="text"
        value={priceFrom}
        onChange={(e) => setPriceFrom(e.target.value)}
        placeholder="Цена от"
        className={styles.priceInput}
      />
      <input
        type="text"
        value={priceTo}
        onChange={(e) => setPriceTo(e.target.value)}
        placeholder="Цена до"
        className={styles.priceInput}
      />
      <button onClick={handleFilterClick} className={styles.priceFilterButton}>
        Применить
      </button>
    </div>
  )
}

export default PriceFilter
