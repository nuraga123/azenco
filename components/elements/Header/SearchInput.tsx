import Select from 'react-select'
import { useState } from 'react'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { SelectOpytionType } from '@/types/common'
import {
  inputStyles,
  controlStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'

const SearchInput = () => {
  const mode = useStore($mode)

  const [searchOption, setSearchOption] = useState<SelectOpytionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOpytionType) => {
    setSearchOption(selectedOption)
  }

  return (
    <Select
      placeholder="ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
          color: 'black',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isClearable={true}
      openMenuOnClick={true}
      options={[1, 2, 3, 33, 333, 6, 7, 8, 9, 10, 11].map((el) => ({
        value: el,
        label: el,
      }))}
    />
  )
}

export default SearchInput
