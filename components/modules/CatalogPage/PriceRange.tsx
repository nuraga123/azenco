import React from 'react'
import { Range, getTrackBackground } from 'react-range'
import { useStore } from 'effector-react'
import { IPriceRangeProps } from '@/types/catalog'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'

const PriceRange = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: IPriceRangeProps) => {
  const STEP = 1
  const MIN = 0
  const MAX = 900000

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // Обработчик изменения диапазона цен
  const handlePriceRangeChange = (values: number[]) => {
    setIsPriceRangeChanged(true)
    setPriceRange(values)
  }

  const handleInputChange = (index: number, value: string) => {
    // Проверяем, является ли значение пустым или равным "-"
    const isEmpty = value === '' || value === '-'

    // Если значение пустое или равно "-", устанавливаем 0, иначе применяем фильтр для чисел
    const numericValue = isEmpty ? '0' : value.replace(/[^0-9]/g, '')

    const parsedValue = parseInt(numericValue, 10)

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      const newPriceRange = [...priceRange]
      newPriceRange[index] = +parsedValue.toString() // Преобразуем в строку
      setPriceRange(newPriceRange)
      setIsPriceRangeChanged(true)
    } else {
      setPriceRange([0, 0])
      setIsPriceRangeChanged(true)
    }
  }

  return (
    <div className={styles.filters__price}>
      <div className={`${styles.filters__placeholder} ${darkModeClass}`}>
        <span>0-dan</span>
        <span>9 999 999-ə qədər</span>
      </div>

      <div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
        <input
          type="number"
          value={priceRange[0] || ''}
          onChange={(e) => handleInputChange(0, e.target.value)}
          placeholder="0"
        />

        <span />

        <input
          type="number"
          value={priceRange[1] || ''}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
      </div>

      {/* Компонент Range для выбора диапазона цен */}
      <Range
        values={priceRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePriceRangeChange}
        // Кастомизация отображения трека ползунка
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: 'auto',
              display: 'flex',
              width: '100%',
              padding: '0 10px',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: priceRange,
                  colors: ['#B1CEFA', '#247CC8', '#B1CEFA'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
          >
            <div
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '3px solid #1C629E',
                boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

export default PriceRange
