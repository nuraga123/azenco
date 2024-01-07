export const getLocalStorageUser = () => {
  const userIdStorage = (localStorage.getItem('userId') as string) || ''
  const usernameStorage = (localStorage.getItem('username') as string) || ''
  const emailStorage = (localStorage.getItem('email') as string) || ''

  return {
    userId: userIdStorage,
    username: usernameStorage,
    email: emailStorage,
  }
}

export const removeLocalStorageUser = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
}
