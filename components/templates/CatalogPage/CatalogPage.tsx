/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { IBoilerPart, IBoilerParts } from '@/types/boilerparts'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { $mode } from '@/context/mode'
import { $boilerParts, setBoilerParts } from '@/context/boilerParts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const router = useRouter()

  const boilerParts = useStore($boilerParts)

  const [spinner, setSpinner] = useState<boolean>(false)

  const pagesLimit: number = 20
  const pagesCount: number = Math.ceil(boilerParts.count / pagesLimit)

  const isValidOffset: boolean = Boolean(
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  )

  const [currentPage, setCurrentPage] = useState<number>(
    isValidOffset ? +query.offset - 1 : 0
  )

  useEffect(() => {
    loadBoilerParts()
  }, [])

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
          setBoilerParts(data)
          return
        }
      }

      const offset = +query.offset - 1
      const urlResult: string = `/boiler-parts?limit=${pagesLimit}&offset=${offset}`
      const result = await getBoilerPartsFx(urlResult)

      setCurrentPage(offset)
      setBoilerParts(result)
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
    } catch (error) {}
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ManufacturersBlock
              title="Вещи"
              manufacturersList={[]}
              event={undefined}
            />
          </AnimatePresence>
          <AnimatePresence>
            <ManufacturersBlock
              title="Запчасти"
              manufacturersList={[]}
              event={undefined}
            />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={true}
            >
              reset
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className={styles.c}>Filter</div>
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
