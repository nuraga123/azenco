import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { getItemLocalStorageUserId } from '@/localStorageUser'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false)
  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  useEffect(() => {
    const checkUser = async () => {
      const localUser = getItemLocalStorageUserId().userId
      if (localUser) {
        const user = await checkUserAuthFx(`/users/${localUser}`)
        console.log(user)

        const loginCheckData = await checkUserAuthFx('/users/login-check')
        console.log('loginCheckData')
        console.log(loginCheckData)

        if (isAuthPage) {
          if (!user) {
            setShouldLoadContent(true)
            return
          }

          router.push('/catalog')
          return
        }

        if (user) {
          setUser(user)
          setShouldLoadContent(true)
          return
        }
      } else {
        router.push('/login')
      }
    }

    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [isAuthPage, router])

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
