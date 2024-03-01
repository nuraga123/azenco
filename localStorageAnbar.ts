export const getLocalStorageAnbar = () => {
  const transferProduct = localStorage.getItem('transferProduct')

  return `${transferProduct}`
}

export const deleteLocalStorageAnbar: () => void = () => {
  localStorage.removeItem('transferProduct')
}

export const setLocalStorageAnbar = (transfer: string) =>
  localStorage.setItem('transferProduct', transfer)
