export function formatDateTime(date: string): string {
  // Преобразуем строку в объект Date
  const dateObject: Date = new Date(date)

  // Функция для добавления нулей к числам, если они меньше 10
  const addZero: (number: number) => string | number = (number: number) =>
    number < 10 ? `0${number}` : number

  const formattedDate: string = `${addZero(dateObject.getDate())}/${addZero(
    dateObject.getMonth() + 1
  )}/${dateObject.getFullYear()} |`

  const formattedTime: string = `${addZero(dateObject.getHours())}:${addZero(
    dateObject.getMinutes()
  )}`

  return `${formattedDate} ${formattedTime}`
}
