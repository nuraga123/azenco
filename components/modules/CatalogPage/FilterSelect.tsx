import Select from 'react-select'
import { useState } from 'react'
import { setSelectBoilerParts } from '@/context/selectsBoilerParts'
import { useRouter } from 'next/router'

export interface OptionFilterSelect {
  value: string
  label: string
}

const options: OptionFilterSelect[] = [
  { value: 'asc', label: 'Дешевые' },
  { value: 'desc', label: 'Дорогие' },
]

const FilterSelect: React.FC = () => {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<OptionFilterSelect>(
    options[0]
  )
  const selectedOptionQuery: OptionFilterSelect =
    router.query.sortBy === options[0].value ? options[0] : options[1]

  const handleChange = (selectedOption: OptionFilterSelect | null) => {
    if (selectedOption) {
      setSelectedOption(selectedOption)
      setSelectBoilerParts(selectedOption)

      // Изменяем URL с учетом выбранной опции
      router.push({
        pathname: '/catalog',
        query: {
          ...router.query,
          sortBy: selectedOption.value,
        },
      })
    }
  }

  return (
    <Select
      value={selectedOptionQuery || selectedOption}
      onChange={handleChange}
      options={options}
    />
  )
}

export default FilterSelect
