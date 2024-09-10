import { createDomain } from 'effector-next'

const navbarIsOpen = createDomain()

export const $setInOpenNavbar = navbarIsOpen.createEvent<string>('')

export const $navbarIsOpen = navbarIsOpen
  .createStore<string>('')
  .on($setInOpenNavbar, (_, state) => state)
