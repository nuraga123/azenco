import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>
  manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
  offset: string
  first: string
  boiler: string
  parts: string
  priceForm: string
  priceTo: string
  partId: string
}

export interface IFilterCheckboxItem {
  title: string
  id?: string
  checked: boolean
  event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[]
  title: string | false
  setManufacturer: Event<IFilterCheckboxItem[]>
  updateManufacturer: Event<IFilterCheckboxItem>
}

export interface ICatalogBaseTypes {
  priceRange: number[]
  resetFilterBtnDisabled: boolean
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetFilters: VoidFunction
}

export interface ICatalogFiltersBaseTypes {
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetFilters: VoidFunction
}

export interface ICatalogFilterProps extends ICatalogBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
  title: string
  resetBtnText: string
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
  openPopup: boolean
  resetFilterBtnDisabled: boolean
  applyFilters: VoidFunction
  handleClosePopup: VoidFunction
  resetAllManufacturers: VoidFunction
}
