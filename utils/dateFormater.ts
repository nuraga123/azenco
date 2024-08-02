export const dateFormater: (str: string) => string = (str: string) =>
  new Date(str).toString() === 'Invalid Date'
    ? 'Yanlış tarix'
    : new Date(str).toLocaleString().slice(0, 17).replace(',', ' ')
