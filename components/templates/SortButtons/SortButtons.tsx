import React from 'react'
import styles from '@/styles/sort-buttons/index.module.scss'

interface SortButtonsProps {
  currentSortBy: 'asc' | 'desc'
  onSortChange: (sortBy: 'asc' | 'desc') => void
}

const SortButtons: React.FC<SortButtonsProps> = ({
  currentSortBy,
  onSortChange,
}) => (
  <div className={styles.sorting}>
    <button
      className={`${styles.button} ${
        currentSortBy === 'asc' ? styles.active : ''
      }`}
      onClick={() => onSortChange('asc')}
    >
      əvvəlcə ucuz
    </button>
    <button
      className={`${styles.button} ${
        currentSortBy === 'desc' ? styles.active : ''
      }`}
      onClick={() => onSortChange('desc')}
    >
      əvvəlcə bahalı
    </button>
  </div>
)

export default SortButtons
