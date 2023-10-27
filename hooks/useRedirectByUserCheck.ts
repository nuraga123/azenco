import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState<boolean>(false)

  const router = useRouter()
  const shouldCheck = useRef(true)

  useEffect(() => {
    if (shouldCheck.current) {
      shouldCheck.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuthFx('users/login-check')

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true)
        return
      }

      router.push('/dashboard')
      return
    }

    if (user) {
      setUser(user)
      setShouldLoadContent(true)
      return
    }

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
