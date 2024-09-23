import { getWorkingServerFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Error404Page = () => {
  const router = useRouter()

  const [serverStatus, setServerStatus] = useState<
    'loading' | 'running' | 'offline'
  >('loading')

  useEffect(() => {
    const getServerStatus = async () => {
      setServerStatus('loading')

      try {
        const response: boolean = await getWorkingServerFx()

        setTimeout(() => {
          if (response) {
            setServerStatus('running')
            router.push('/my')
          } else {
            setServerStatus('offline')
            router.push('404')
          }
        }, 5000)
      } catch (error) {
        console.log('Error:', error)
        setTimeout(() => setServerStatus('offline'), 1000)
      }
    }

    const intervalId = setInterval(getServerStatus, 10000)
    return () => clearInterval(intervalId)
  }, [router, serverStatus])

  return (
    <div className="flex-container">
      <div className="text-center">
        <button onClick={() => router.push('/help')}>proqramçı yardımı</button>
        <h2>Server işləmir</h2>
        <br />
        <h2 className="fadeIn">Xahiş edirik, daha sonra yenidən cəhd edin</h2>
        <br />
        <button onClick={() => router.push(`/my`)}>menyuya qayıdın</button>
      </div>
    </div>
  )
}

export default Error404Page
