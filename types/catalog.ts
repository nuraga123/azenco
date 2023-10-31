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

export interface IPriceRangeProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFilterDesktopProps extends IPriceRangeProps {
  resetFilterBtnDisabled: boolean
  spinner: boolean
  isPriceRangeChanged: boolean
  resetFilters: VoidFunction
  applyFilters: VoidFunction
}

export interface ICatalogFilterProps extends IPriceRangeProps {
  currentPage: number
  spinner: boolean
  resetFilterBtnDisabled: boolean
  isPriceRangeChanged: boolean
  resetFilters: VoidFunction
  setIsFilterInQuery: (arg0: boolean) => void
}
