export const formaterDate: (str: string) => string = (str: string) =>
  new Date(str).toString() === 'Invalid Date'
    ? 'Invalid Date'
    : new Date(str).toLocaleString().slice(0, 17).replace(',', ' ')
