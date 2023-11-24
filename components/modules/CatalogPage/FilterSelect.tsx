import Select from 'react-select'
import { useState } from 'react'
import { setSelectBoilerParts } from '@/context/selectsBoilerParts'

export interface OptionFilterSelect {
  value: boolean
  label: string
}

const options: Option[] = [
  { value: true, label: 'Дешевые' },
  { value: false, label: 'Дорогие' },
]

const FilterSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionFilterSelect>(
    options[0]
  )

  const handleChange = (selectedOption: OptionFilterSelect | null) => {
    if (selectedOption) {
      setSelectedOption(selectedOption)
      setSelectBoilerParts(selectedOption)
    }
  }

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  )
}

export default FilterSelect
