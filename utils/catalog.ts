import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender } from './common'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { setFilterBoilerParts } from '@/context/boilerParts'

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map((item) => createManufacturerCheckboxObj(item))

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map((item) => createManufacturerCheckboxObj(item))

const checkPriceFromQuery = (price: number) =>
  !isNaN(price) && price >= 0 && price <= 900000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const boilerQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )
  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string,
  sortBy: string
) => {
  callback()

  const data = await getBoilerPartsFx(
    `/boiler-parts?limit=20&offset=${path}&sortBy=${sortBy ? sortBy : 'asc'}`
  )

  setFilterBoilerParts(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter,
  sortBy: string
) {
  const params = router.query

  delete params.boiler
  delete params.parts
  delete params.priceFrom
  delete params.priceTo
  delete params.sortBy

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getBoilerPartsFx(
    `/boiler-parts?limit=20&offset=${path}&sortBy=${sortBy ? sortBy : 'asc'}`
  )

  setFilterBoilerParts(data)
}
