import { createDomain } from 'effector-next'
import { IBoilerParts } from '@/types/boilerparts'
import { IFilterCheckboxItem } from '@/types/catalog'
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog'

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerPartsCheapFirst = boilerParts.createEvent()

export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()

export const setBoilerPartsByPopularity = boilerParts.createEvent()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

// Boiler Parts
export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)
  .on(setBoilerPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setBoilerPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setBoilerPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

// Boiler Manufacturers
export const setBoilerManufacturers =
  boilerParts.createEvent<IFilterCheckboxItem[]>()

export const updateBoilerManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()

export const $boilerManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(
    boilerManufacturers as IFilterCheckboxItem[]
  )
  .on(setBoilerManufacturers, (_, parts) => parts)
  .on(updateBoilerManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])

// Parts Manufacturers
export const setPartsManufacturers =
  boilerParts.createEvent<IFilterCheckboxItem[]>()

export const updatePartsManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()

export const $partsManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturer, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])

// filter
export const setFilterBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const $filteredBoilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setFilterBoilerParts, (_, part) => part)
