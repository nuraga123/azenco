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
}) => {
  console.log(`currentPage: ${currentPage}`)
  console.log(`totalPages: ${totalPages}`)
  const array = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      {array.map((el: number) => (
        <button
          key={el}
          className={el + 1 === currentPage ? styles.active : ''}
          onClick={() => onPageChange(el)}
        >
          {el}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {'>>'}
      </button>
    </div>
  )
}
export default Pagination
