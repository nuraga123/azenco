import { createDomain } from 'effector-next'

const anbarId = createDomain()

export const setAnbarId = anbarId.createEvent<number>()

export const $anbarId = anbarId
  .createStore<number>(0)
  .on(setAnbarId, (_, id) => id)
