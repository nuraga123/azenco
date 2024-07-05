import React from 'react'
import styles from '@/styles/pagination/index.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className={styles.pagination}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      {'<<'}
    </button>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={index + 1 === currentPage ? styles.active : ''}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      {'>>'}
    </button>
  </div>
)

export default Pagination
