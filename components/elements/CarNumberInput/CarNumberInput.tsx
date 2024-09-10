import React, { useState } from 'react'

const CarNumberInput = () => {
  const [value, setValue] = useState('')
  const [isAzerbaijan, setIsAzerbaijan] = useState(false)

  // Функция проверки формата номера для Азербайджана
  const checkAzerbaijanNumber = (num: string) => {
    const pattern = /^10-[A-Z]{2}-\d{3}$/ // Формат "10-AB-123"
    return pattern.test(num)
  }

  const handleInputChange = (e: string) => {
    setValue(e)
    // Проверка формата номера
    if (checkAzerbaijanNumber(e)) {
      setIsAzerbaijan(true)
    } else {
      setIsAzerbaijan(false)
    }
  }

  return (
    <div>
      <label>Введите номер автомобиля:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={isAzerbaijan ? 'Формат: 10-AB-123' : 'Введите номер'}
        className="modal__input"
      />
    </div>
  )
}

export default CarNumberInput
