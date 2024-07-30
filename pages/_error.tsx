import { NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

const ErrorPage = () => {
  const router = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <div className="flex-container">
      {shouldLoadContent && (
        <div className="text-center">
          <h2 className="fadeIn">SƏHİFƏ TAPILMADI</h2>
          <br />
          <h2>Xəta baş verdi</h2>
          <button onClick={() => router.push('/my')}>
            Server işləmir. Xahiş edirik, daha sonra yenidən cəhd edin.
          </button>
        </div>
      )}
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
