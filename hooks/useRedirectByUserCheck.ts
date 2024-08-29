import { getTokenFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { getLocalStorageUser, removeLocalStorageUser } from '@/localStorageUser'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const router = useRouter()
  const shouldCheckAuth = useRef(true)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [shouldLoadContent, setShouldLoadContent] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { tokenStorage } = getLocalStorageUser()

      if (tokenStorage) {
        const user = await getTokenFx(tokenStorage)
        console.log('user token Storage')
        console.log(user)

        // Если запрос к серверу вернул 'not server', перенаправляем на страницу 404
        if (user === 'not server') {
          router.push('/404')
          return
        }

        // Если это страница аутентификации
        if (isAuthPage) {
          // Если токен истек или ошибка JsonWebTokenError, удаляем токен и перенаправляем на страницу входа
          if (user?.message) {
            removeLocalStorageUser()
            if (!isRedirecting) {
              // Если не происходит редирект, выполняем его
              setIsRedirecting(true)
              router.push('/login')
              return
            }
          }

          // Если нет пользователя, перенаправляем на страницу входа
          if (!user) {
            if (!isRedirecting) {
              // Если не происходит редирект, выполняем его
              setIsRedirecting(true)
              router.push('/login')
              return
            }
          }

          // Если пользователь авторизован, перенаправляем на главную страницу пользователя
          if (!isRedirecting) {
            // Если не происходит редирект, выполняем его
            setIsRedirecting(true)
            router.push('/my')
            return
          }
        }

        // Если это не страница аутентификации
        // Если токен истек или ошибка JsonWebTokenError, перенаправляем на страницу входа
        if (user?.message) {
          toast.error(user?.message)
          if (!isRedirecting) {
            // Если не происходит редирект, выполняем его
            setIsRedirecting(true)
            router.push('/login')
            return
          }
        }

        // Если пользователь существует, сохраняем его данные и показываем контент
        if (user) {
          setUser(user)
          setShouldLoadContent(true)
          setIsRedirecting(false) // Сброс состояния редиректа
          return
        }
      } else {
        // Если токен отсутствует, перенаправляем на страницу входа
        if (!isRedirecting) {
          // Если не происходит редирект, выполняем его
          setIsRedirecting(true)
          router.push('/login')
          return
        }
      }
    }

    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
      return
    }
  }, [isAuthPage, router, isRedirecting])

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
