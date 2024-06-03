import React, { useState } from 'react'
import SearchBar from '@/components/modules/BarnsPage/SearchBar'
import { getSearchNameWordProductFx } from '@/app/api/products'
import { $setProducts } from '@/context/barns'

const SearchContainer: React.FC = () => {
  const [filter, setFilter] = useState('name')
  const [searchValue, setSearchValue] = useState('')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(1000000)

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handlePriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(+event.target.value)
  }

  const handlePriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(+event.target.value)
  }

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (filter === 'name') {
      try {
        const { products } = await getSearchNameWordProductFx({
          part_name: searchValue,
        })
        console.log('Результаты поиска:', products)
        $setProducts(products)
      } catch (error) {
        console.error('Ошибка поиска по имени:', error)
      }
    } else {
      console.log('Поиск по:', { filter, searchValue, priceMin, priceMax })
    }
  }

  const handleApplyPrice = () => {
    console.log('Ценовой диапазон:', { priceMin, priceMax })
  }

  return (
    <SearchBar
      filter={filter}
      value={searchValue}
      priceMin={+priceMin}
      priceMax={+priceMax}
      onFilterChange={handleFilterChange}
      onValueChange={handleValueChange}
      onPriceMinChange={handlePriceMinChange}
      onPriceMaxChange={handlePriceMaxChange}
      onSearchSubmit={handleSearchSubmit}
      onApplyPrice={handleApplyPrice}
    />
  )
}

export default SearchContainer
