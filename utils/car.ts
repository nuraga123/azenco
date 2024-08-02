export const formatCarNumber = (value: string): string => {
  // Удаление всех нецифровых символов, кроме букв
  const cleanedValue = value.replace(/[^A-Z0-9]/gi, '')

  // Форматирование строки с тире
  let formattedValue = ''

  const digits = cleanedValue.replace(/[^0-9]/g, '') // Оставляем только цифры
  const letters = cleanedValue.replace(/[0-9]/g, '') // Оставляем только буквы

  if (digits.length > 0) {
    formattedValue += digits.slice(0, 2) // Первые 2 цифры
  }
  if (letters.length > 0) {
    formattedValue += '-' + letters.slice(0, 2).toLocaleUpperCase() // Следующие 2 буквы
  }
  if (digits.length > 2) {
    formattedValue += '-' + digits.slice(2, 5) // Оставшиеся 3 цифры
  }

  return formattedValue
}
