import React from 'react'
import styles from '@/styles/pagination/index.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number | string) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5)
        pages.push('...', totalPages)
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        )
      } else {
        pages.push(1, '...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      }
    }
    return pages
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.navigationButton}
      >
        Назад
      </button>
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        ) : (
          <button
            key={index}
            className={currentPage === page ? styles.active : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.navigationButton}
      >
        Вперед
      </button>
    </div>
  )
}

export default Pagination
