import { getWorkingServerFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Error404 = () => {
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
            router.push('/my') // Перенаправляем на страницу /my
          } else {
            setServerStatus('offline')
          }
        }, 5000)
      } catch (error) {
        console.log('Error:', error)
        setServerStatus('offline')
      }
    }

    getServerStatus() // Вызываем функцию один раз при загрузке
    const intervalId = setInterval(getServerStatus, 10000) // Периодическая проверка статуса
    return () => clearInterval(intervalId)
  }, [router])

  return (
    <div className="flex-container">
      <div className="text-center">
        {serverStatus === 'offline' && (
          <>
            <h2>Server işləmir</h2>
            <h2 className="fadeIn">
              Xahiş edirik, daha sonra yenidən cəhd edin
            </h2>
            <button onClick={() => router.push('/help')}>
              proqramçı yardımı
            </button>
            <br />
            <button onClick={() => router.push('/my')}>menyuya qayıdın</button>
          </>
        )}
        {serverStatus === 'loading' && (
          <>
            <h2>Server işləmir</h2>
            <h2 className="fadeIn">
              Xahiş edirik, daha sonra yenidən cəhd edin
            </h2>
            <button onClick={() => router.push('/help')}>
              proqramçı yardımı
            </button>
            <br />
            <button onClick={() => router.push('/my')}>menyuya qayıdın</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Error404
