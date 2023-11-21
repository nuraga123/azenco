import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '@/context/boilerParts'
import { ICatalogFilterProps } from '@/types/catalog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getQueryParamOnFirstRender } from '@/utils/common'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'

import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import CatalogFiltersMobile from './CatalogFiltersMobile'

const CatalogFilters = ({
  priceRange,
  currentPage,
  resetFilterBtnDisabled,
  isPriceRangeChanged,
  setPriceRange,
  setIsPriceRangeChanged,
  setIsFilterInQuery,
  resetFilters,
  closePopup,
  filtersMobileOpen,
}: ICatalogFilterProps) => {
  const router = useRouter()
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        boilerQueryValue,
        partsQueryValue,
      } = checkQueryParams(router)

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        router
      )}`

      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`

      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        console.log('все 3 фильтра')
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)

        return
      }

      if (
        isValidPriceQuery &&
        boilerQueryValue?.length === 0 &&
        partsQueryValue?.length === 0
      ) {
        console.log('только фильтр цены')
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)

        return
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        console.log('только фильтр boilers и parts')
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`)

        return
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        console.log('только boilers и цена')

        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}${priceQuery}`)

        return
      }

      if (isValidBoilerQuery) {
        console.log('только boilers')

        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`)

        return
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        console.log('только parts и цена')

        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}${priceQuery}`)

        return
      }

      if (isValidPartsQuery) {
        console.log('только parts')

        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
        }, `${currentPage}${partsQuery}`)

        return
      }
    } catch (error) {
      const err = (error as Error).message

      if (err === 'URI malformed') {
        toast.warning('FILTRI SIFIRLAYIN')
        return
      } else {
        toast.error(err)
      }
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true)
    setIsPriceRangeChanged(true)
    setPriceRange([+priceFrom, +priceTo])
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])

      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''

      const boilers = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)

      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)

      const encodeBoilersQuery = encodeURIComponent(JSON.stringify(boilers))
      const encodePartsQuery = encodeURIComponent(JSON.stringify(parts))

      const boilersQuery = `&boiler=${encodeBoilersQuery}`
      const partsQuery = `&parts=${encodePartsQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (boilers.length && parts.length && isPriceRangeChanged) {
        console.log('все 3 фильтра')
        updateParamsAndFilters(
          {
            boiler: encodeBoilersQuery,
            parts: encodePartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${boilersQuery}${partsQuery}`,
          router
        )
        return
      }

      if (isPriceRangeChanged && parts.length === 0 && boilers.length === 0) {
        console.log('только фильтр цены')
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`,
          router
        )
        return
      }

      if (boilers.length && parts.length) {
        console.log('только фильтр boilers и parts')
        updateParamsAndFilters(
          {
            boiler: encodeBoilersQuery,
            parts: encodePartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilersQuery}${partsQuery}`,
          router
        )
        return
      }

      if (boilers.length && isPriceRangeChanged) {
        console.log('только boilers и цена')

        updateParamsAndFilters(
          {
            boiler: encodeBoilersQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${boilersQuery}${priceQuery}`,
          router
        )
        return
      }

      if (boilers.length) {
        console.log('только boilers')
        updateParamsAndFilters(
          {
            boiler: encodeBoilersQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilersQuery}`,
          router
        )
        return
      }

      if (parts.length && isPriceRangeChanged) {
        console.log('только parts и цена')
        updateParamsAndFilters(
          {
            parts: encodePartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${partsQuery}`,
          router
        )
        return
      }

      if (parts.length) {
        console.log('только parts ')

        updateParamsAndFilters(
          {
            parts: encodePartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}`,
          router
        )
        return
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          spinner={spinner}
          priceRange={priceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
