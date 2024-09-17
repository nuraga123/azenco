import { getWorkingServerFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Error404Page = () => {
  const router = useRouter()

  useEffect(() => {
    const loadState = async () => {
      const workingStatus = await getWorkingServerFx()

      if (workingStatus) router.push('/my')
      else router.push('/404')
    }

    loadState()
  }, [router])

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
