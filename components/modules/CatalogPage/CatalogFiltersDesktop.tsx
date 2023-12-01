import { useStore } from 'effector-react'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { $mode } from '@/context/mode'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktopProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFiltersDesktop = ({
  spinner,
  priceRange,
  resetFilterBtnDisabled,
  applyFilters,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilters,
}: ICatalogFilterDesktopProps) => {
  const mode = useStore($mode)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Filtrlər
      </h3>

      <div className={styles.filters__price}>
        <Accordion
          title="Qiymət"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>

      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title="İstehsalçı"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        />
      </div>

      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Ehtiyat hissələri"
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturers}
        />
      </div>

      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Göstər'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}
        >
          Sıfırlayın
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
