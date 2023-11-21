import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllManufacturers,
  handleClosePopup,
  updateManufacturer,
  setManufacturer,
  applyFilters,
  openPopup,
  title,
  manufacturersList,
}: IFiltersPopupProps) => {
  const mode = useStore($mode)
  const darkModeToggle = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div
      className={`${styles.filters__popup} ${darkModeToggle} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          title={title as string}
          resetBtnText={'Sıfırlayın'}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllManufacturers}
          closePopup={handleClosePopup}
        />

        <FilterManufacturerAccordion
          manufacturersList={manufacturersList}
          title={false}
          setManufacturer={setManufacturer}
          updateManufacturer={updateManufacturer}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Göstər
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Geri
        </button>
      </div>
    </div>
  )
}

export default FiltersPopup
