import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { IFiltersPopupTop } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopupTop = ({
  title,
  resetBtnText,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
}: IFiltersPopupTop) => {
  const mode = useStore($mode)
  const darkModeToggle = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div
      className={`${styles.catalog__bottom__filters__top} ${darkModeToggle}`}
    >
      <button
        className={`${styles.catalog__bottom__filters__title} ${darkModeToggle}`}
        onClick={closePopup}
      >
        {title}
      </button>
      <button
        className={styles.catalog__bottom__filters__reset}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  )
}
export default FiltersPopupTop
