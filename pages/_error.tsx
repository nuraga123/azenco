import { NextApiResponse } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ErrorPage = () => {
  const router = useRouter()

  useEffect(() => {
    // Перенаправляем пользователя на главную страницу через 5 секунд
    const redirectTimer = setTimeout(() => {
      router.push('/')
    }, 5000)

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">SƏHİFƏ TAPILMADI</h3>
        <p>Xəta baş verdi, sizi əsas səhifəyə yönəldirəcəyik...</p>
        <button onClick={() => router.push('/')}>Əsas səhifəyə qayıdın</button>
      </div>
    </div>
  )
}

// Устанавливаем статус код 404
export const getServerSideProps = ({ res }: { res: NextApiResponse }) => {
  if (res) {
    res.statusCode = 404
  }
  return {
    props: {},
  }
}

export default ErrorPage
