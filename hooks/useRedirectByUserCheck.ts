import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { getTokenFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { getLocalStorageUser, removeLocalStorageUser } from '@/localStorageUser'

const useRedirectByUserCheck = (isAuthPage: boolean = false) => {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
  const [shouldLoadContent, setShouldLoadContent] = useState<boolean>(false)
  const hasCheckedAuth = useRef<boolean>(false)

  useEffect(() => {
    const checkUser = async () => {
      // Функция для выполнения редиректа
      const handleRedirect = (path: string) => {
        if (!isRedirecting) {
          setIsRedirecting(true)
          router.push(path)
        }
      }

      const { tokenStorage } = getLocalStorageUser()

      if (!tokenStorage) {
        handleRedirect('/login')
        return
      }

      const user = await getTokenFx(tokenStorage)

      if (user === 'not server') {
        handleRedirect('/404')
        return
      }

      if ('message' in user) {
        removeLocalStorageUser()
        toast.error(user.message)
        handleRedirect('/login')
        return
      }

      if (isAuthPage) {
        handleRedirect('/my')
        return
      }

      setUser(user)
      setShouldLoadContent(true)
      setIsRedirecting(false)
    }

    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true
      checkUser()
    }
  }, [isAuthPage, isRedirecting, router])

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
