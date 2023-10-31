import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setFilterBoilerParts,
} from '@/context/boilerParts'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/catalog/index.module.scss'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { getBoilerPartsFx } from '@/app/api/boilerParts'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
}: ICatalogFilterProps) => {
  const router = useRouter()
  const isMobile = useMediaQuery(820)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [spinner, setSpinner] = useState(false)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

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
      const partsQuery = `&boiler=${encodePartsQuery}`
      console.log(partsQuery)

      const initialPage = currentPage > 0 ? 0 : currentPage

      // все 3 фильтра
      if (boilers.length && parts.length && isPriceRangeChanged) {
        console.log('все 3 фильтра')
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodeBoilersQuery,
              parts: encodePartsQuery,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${boilersQuery}${partsQuery}`
        )

        setFilterBoilerParts(data)
        return
      }

      // только фильтр цены
      if (isPriceRangeChanged) {
        console.log('только фильтр цены')
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
        )

        setFilterBoilerParts(data)
        return
      }

      // // только фильтр: boilers или parts
      // if (boilers.length || parts.length) {
      //   console.log('только фильтр: boilers или parts')
      //   router.push(
      //     {
      //       query: {
      //         ...router.query,
      //         boiler: encodeBoilersQuery,
      //         parts: encodePartsQuery,
      //         offset: initialPage + 1,
      //       },
      //     },
      //     undefined,
      //     { shallow: true }
      //   )

      //   const data = await getBoilerPartsFx(
      //     `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
      //   )

      //   setFilterBoilerParts(data)
      //   return
      // }

      // только boilers
      if (boilers.length) {
        console.log('только boilers')

        router.push(
          {
            query: {
              ...router.query,
              boiler: encodeBoilersQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${boilersQuery}`
        )

        setFilterBoilerParts(data)
        return
      }

      // только parts
      if (parts.length) {
        console.log('только parts')

        router.push(
          {
            query: {
              ...router.query,
              parts: encodePartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}`
        )

        setFilterBoilerParts(data)
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
        <div className={`${styles.c} ${darkModeClass}`} />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          isPriceRangeChanged={isPriceRangeChanged}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
