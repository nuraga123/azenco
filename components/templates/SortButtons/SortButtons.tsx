import React from 'react'
import styles from '@/styles/sort-buttons/index.module.scss'

interface SortButtonsProps {
  currentSortBy: string
  onSortChange: (sortBy: string) => void
}

const SortButtons: React.FC<SortButtonsProps> = ({
  currentSortBy,
  onSortChange,
}) => (
  <div className={styles.sorting}>
    <button
      className={`${styles.button} ${currentSortBy === 'asc' ? styles.active : ''}`}
      onClick={() => onSortChange('asc')}
    >
      Сортировать по возрастанию
    </button>
    <button
      className={`${styles.button} ${currentSortBy === 'desc' ? styles.active : ''}`}
      onClick={() => onSortChange('desc')}
    >
      Сортировать по убыванию
    </button>
  </div>
)

export default SortButtons
