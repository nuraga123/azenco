/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { IBoilerPart, IBoilerParts } from '@/types/boilerparts'
import { IQueryParams } from '@/types/catalog'
import { $mode } from '@/context/mode'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import usePopup from '@/hooks/usePopup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const [spinner, setSpinner] = useState<boolean>(false)

  const router = useRouter()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const boilerParts = useStore($boilerParts)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  const filteredBoilerParts = useStore($filteredBoilerParts)
  const [isFilterInQuery, setIsFilterInQuery] = useState<boolean>(false)

  const [priceRange, setPriceRange] = useState<number[]>([1, 10000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState<boolean>(false)

  const pagesLimit: number = 20
  const pagesCount: number = isNaN(Math.ceil(boilerParts.count / pagesLimit))
    ? 40 / pagesLimit
    : Math.ceil(boilerParts.count / pagesLimit)

  const isValidOffset =
    +query.offset && !isNaN(+query.offset) && +query.offset > 0

  const [currentPage, setCurrentPage] = useState<number>(
    isValidOffset ? +query.offset - 1 : 0
  )

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )

  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  const { toggleOpen, open, closePopup } = usePopup()

  useEffect(() => {
    loadBoilerParts()
    console.log(
      isFilterInQuery ? 'фильтрация включина' : 'фильтрация выключина'
    )
  }, [filteredBoilerParts, isFilterInQuery])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const urlData: string = `/boiler-parts?limit=${pagesLimit}&offset=0`
      const data = await getBoilerPartsFx(urlData)

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data?.count / pagesLimit)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
          return
        }

        const offset = +query.offset - 1
        const urlResult: string = `/boiler-parts?limit=${pagesLimit}&offset=${offset}`
        const result = await getBoilerPartsFx(urlResult)

        setCurrentPage(offset)
        setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
        return
      }

      setCurrentPage(0)
      setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const urlData: string = `/boiler-parts?limit=${pagesLimit}&offset=0`
      const data: IBoilerParts = await getBoilerPartsFx(urlData)

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } =
        checkQueryParams(router)

      const urlResult: string = `/boiler-parts?limit=${pagesLimit}&offset=${selected}${
        isFilterInQuery && isValidBoilerQuery
          ? `&boiler=${router.query.boiler}`
          : ''
      }${
        isFilterInQuery && isValidPartsQuery
          ? `&parts=${router.query.parts}`
          : ''
      }${
        isFilterInQuery && isValidPriceQuery
          ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
          : ''
      }`

      const result: IBoilerParts = await getBoilerPartsFx(urlResult)

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const urlData: string = `/boiler-parts?limit=${pagesLimit}&offset=0`
      const data: IBoilerParts = await getBoilerPartsFx(urlData)
      const params = router.query

      delete params.boiler
      delete params.parts
      delete params.priceFrom
      delete params.priceTo

      params.first = 'cheap'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setBoilerParts(data)
      setPriceRange([1, 10000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Kataloq</h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          {isAnyBoilerManufacturerChecked && (
            <AnimatePresence>
              <ManufacturersBlock
                title="İstehsalçı"
                manufacturersList={boilerManufacturers}
                event={updateBoilerManufacturer}
              />
            </AnimatePresence>
          )}
          {isAnyPartsManufacturerChecked && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Ehtiyat hissələri"
                manufacturersList={partsManufacturers}
                event={updatePartsManufacturer}
              />
            </AnimatePresence>
          )}
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Sıfırlayın
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Filter
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              currentPage={currentPage}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              isPriceRangeChanged={isPriceRangeChanged}
              setIsFilterInQuery={setIsFilterInQuery}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item: IBoilerPart) => (
                    <CatalogItem key={item.id} item={item} />
                  ))
                ) : (
                  <div
                    className={`${styles.catalog__no_products} ${darkModeClass}`}
                  >
                    {filteredBoilerParts.count === 0
                      ? 'Seçdiyiniz filtr üçün məhsul tapılmadı...'
                      : 'Məhsul siyahısı boşdur...'}
                  </div>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
