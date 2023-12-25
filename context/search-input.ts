import { createDomain } from 'effector-next'

const searchInput = createDomain()

export const setSearchInputZIndex = searchInput.createEvent<number>()

export const $searchInputZIndex = searchInput
  .createStore<number>(1)
  .on(setSearchInputZIndex, (_, search) => search)
