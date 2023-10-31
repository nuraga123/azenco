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

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const router = useRouter()

  const boilerParts = useStore($boilerParts)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)

  const [spinner, setSpinner] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<number[]>([1, 10000])
  const [isFilterInQuery, setIsFilterInQuery] = useState<boolean>(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState<boolean>(false)

  const pagesLimit: number = 20
  const pagesCount: number = Math.ceil(boilerParts.count / pagesLimit)

  const isValidOffset: boolean = Boolean(
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  )

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

  useEffect(() => {
    loadBoilerParts()
  }, [filteredBoilerParts, isFilterInQuery])

  console.log(filteredBoilerParts)

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
      setSpinner(false)
    }
  }

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const urlData: string = `/boiler-parts?limit=${pagesLimit}&offset=0`
      const data: IBoilerParts = await getBoilerPartsFx(urlData)

      if (selected > pagesCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }

      const urlResult: string = `/boiler-parts?limit=${pagesLimit}&offset=${selected}`
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
      console.log(error)
    }
  }

  const resetFilters = async () => {
    try {
      const urlData: string = `/boiler-parts?limit=${pagesLimit}&offset=0`
      const data: IBoilerParts = await getBoilerPartsFx(urlData)
      router.push('/catalog')
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
      console.log(error)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          {isAnyBoilerManufacturerChecked && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Вещи"
                manufacturersList={boilerManufacturers}
                event={updateBoilerManufacturer}
              />
            </AnimatePresence>
          )}
          {isAnyPartsManufacturerChecked && (
            <AnimatePresence>
              <ManufacturersBlock
                title="Запчасти"
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
              reset
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              currentPage={currentPage}
              priceRange={priceRange}
              spinner={spinner}
              setPriceRange={setPriceRange}
              isPriceRangeChanged={isPriceRangeChanged}
              setIsFilterInQuery={setIsFilterInQuery}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
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
                  <span>yoxdu</span>
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
