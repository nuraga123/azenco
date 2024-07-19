import { ChangeEvent } from 'react'
import styles from '@/styles/products/search.module.scss'
import { ISearchProducts } from '@/types/products'

const SearchProductsComponent = ({
  searchType,
  searchValue,
  priceFrom,
  priceTo,
  setSearchType,
  setSearchValue,
  setPriceFrom,
  setPriceTo,
  searchProduct,
  clearSearch,
}: ISearchProducts) => {
  const handleSearchType = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSearchType(event.target.value === 'name' ? 'name' : 'code')
  }

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchValue(event.target.value)
  }

  const handlePriceFrom = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPriceFrom(event.target.value)
  }

  const handlePriceTo = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPriceTo(event.target.value)
  }

  console.log('SearchProductsComponent')
  return (
    <div className={styles.searchContainer}>
      <div className={styles.topSection}>
        <select
          value={searchType}
          className={styles.searchSelect}
          onChange={handleSearchType}
        >
          <option value="name">Məhsul adına görə axtarın</option>
          <option value="code">Məhsul Azenco kodu ilə axtarın</option>
        </select>

        <input
          type="text"
          value={searchValue}
          onChange={handleSearchValue}
          placeholder={`Məhsul ${
            searchType === 'name' ? 'adı' : 'kodu'
          } ilə axtarın`}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.priceFilterContainer}>
          <input
            type="text"
            value={priceFrom}
            onChange={handlePriceFrom}
            placeholder="min. qiymət"
            className={styles.priceInput}
          />
          <input
            type="text"
            value={priceTo}
            onChange={handlePriceTo}
            placeholder="max. qiymət"
            className={styles.priceInput}
          />

          <button onClick={clearSearch} className={styles.clearButton}>
            Filtri silin
          </button>
        </div>

        <button
          onClick={searchProduct}
          disabled={!searchValue && !priceFrom && !priceTo}
          className={styles.searchButton}
        >
          Axtar
        </button>
      </div>
    </div>
  )
}

export default SearchProductsComponent
