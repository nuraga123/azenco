import { useRouter } from 'next/router'

const Error404Page = () => {
  const router = useRouter()

  return (
    <div className="flex-container">
      <div className="text-center">
        <button onClick={() => router.push('/help')}>proqramçı yardımı</button>
        <h2>Server işləmir</h2>
        <br />
        <h2 className="fadeIn">Xahiş edirik, daha sonra yenidən cəhd edin</h2>
        <br />
        <button onClick={() => router.push('/')}>əsas menyuya qayıdın</button>
      </div>
    </div>
  )
}

export default Error404Page
