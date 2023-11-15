import { useStore } from 'effector-react'
import { useState } from 'react'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'
import FiltersPopup from './FiltersPopup'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
  spinner,
  resetFilters,
  closePopup,
  applyFilters,
  resetFilterBtnDisabled,
  filtersMobileOpen,
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  const darkModeToggle = mode === 'dark' ? `${styles.dark_mode}` : ''
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  const [openBoiler, setOpenBoiler] = useState(false)
  const [openParts, setOpenParts] = useState(false)

  const handleOpenBoilers = () => setOpenBoiler(true)
  const handleCloseBoiler = () => setOpenBoiler(false)

  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)

  const isAniBoilerManufacturersChecked = boilerManufacturers.some(
    (item) => item.checked
  )

  const isAniPartsManufacturersChecked = partsManufacturers.some(
    (item) => item.checked
  )

  const resetAllBoilerManufacturers = () =>
    setBoilerManufacturers(
      boilerManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const resetAllPartsManufacturers = () =>
    setBoilerManufacturers(
      partsManufacturers.map((item) => ({ ...item, checked: false }))
    )

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  const isMobile = useMediaQuery(820)

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeToggle} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={`${styles.catalog__bottom__filters__inner}`}>
        <FiltersPopupTop
          title="Filtrlər"
          resetBtnText="Hər şeyi sıfırlayın"
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeToggle}`}
            onClick={handleOpenBoilers}
          >
            İstehsalçı
          </button>
          <FiltersPopup
            title="İstehsalçı"
            openPopup={openBoiler}
            resetFilterBtnDisabled={!isAniBoilerManufacturersChecked}
            applyFilters={applyFilters}
            handleClosePopup={handleCloseBoiler}
            resetAllManufacturers={resetAllBoilerManufacturers}
            manufacturersList={boilerManufacturers}
            setManufacturer={setBoilerManufacturers}
            updateManufacturer={updateBoilerManufacturer}
          />
        </div>
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeToggle}`}
            onClick={handleOpenParts}
          >
            Ehtiyat hissələri
          </button>
          <FiltersPopup
            title="Ehtiyat hissələri"
            openPopup={openParts}
            resetFilterBtnDisabled={!isAniPartsManufacturersChecked}
            applyFilters={applyFilters}
            handleClosePopup={handleCloseParts}
            resetAllManufacturers={resetAllPartsManufacturers}
            manufacturersList={partsManufacturers}
            setManufacturer={setPartsManufacturers}
            updateManufacturer={updatePartsManufacturer}
          />
        </div>

        <div className={styles.filters__price}>
          <Accordion
            title="Qiymət"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeToggle}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
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
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
