import { OptionFilterSelect } from '@/components/modules/CatalogPage/FilterSelect'
import { createDomain } from 'effector-next'

const selectsBoilerParts = createDomain()

export const setSelectBoilerParts =
  selectsBoilerParts.createEvent<OptionFilterSelect>()

export const $selectsBoilerParts = selectsBoilerParts
  .createStore<OptionFilterSelect>({} as OptionFilterSelect)
  .on(setSelectBoilerParts, (_, select) => select)
