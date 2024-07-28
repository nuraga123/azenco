// pages/404.tsx

import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Error404Page = () => {
  const router = useRouter()
  const title: string = document.title
  console.log(title)

  useEffect(() => {
    // Перенаправляем пользователя на главную страницу через 5 секунд
    const redirectTimer = setTimeout(() => {
      router.push('/')
    }, 3000)

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

export default Error404Page
