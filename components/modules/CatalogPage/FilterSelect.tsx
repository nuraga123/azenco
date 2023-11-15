/* eslint-disable indent */
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IOption, SelectOpytionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import {
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
} from '@/context/boilerParts'
import { useRouter } from 'next/router'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const boilerParts = useStore($boilerParts)
  const [categoryOption, setCategoryOption] = useState<SelectOpytionType>(null)

  const router = useRouter()

  useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Əvvəlcə ucuz')
          setBoilerPartsCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Əvvəlcə bahalı')
          setBoilerPartsExpensiveFirst()
          break
        case 'popularity':
          updateCategoryOption('Populyarlığa görə')
          setBoilerPartsByPopularity()
          break
        default:
          updateCategoryOption('Əvvəlcə ucuz')
          setBoilerPartsCheapFirst()
          break
      }
    }
  }, [boilerParts.rows, router.query.first])

  const updateCategoryOption = (value: string) => {
    setCategoryOption({ value: value, label: value })
  }

  const updateRoteParams = (first: string) => {
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleSortOptionChange = (selectedOption: SelectOpytionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'Əvvəlcə ucuz':
        setBoilerPartsCheapFirst()
        updateRoteParams('cheap')
        break
      case 'Əvvəlcə bahalı':
        setBoilerPartsExpensiveFirst()
        updateRoteParams('expensive')
        break
      case 'Populyarlığa görə':
        setBoilerPartsByPopularity()
        updateRoteParams('popularity')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder="axtarmaq..."
      value={categoryOption || createSelectOption('Əvvəlcə ucuz')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
          color: 'black',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
          border: '1px solid #cccccc',
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions.map((el) => ({
        value: el.value,
        label: el.label,
      }))}
    />
  )
}

export default FilterSelect
