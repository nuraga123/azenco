import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import AnbarItem from '@/components/modules/AnbarPage/AnbarItem'

import '@/styles/globals.css'
import Link from 'next/link'

function AnbarOnePage() {
  const { shouldLoadContent } = useRedirectByUserCheck()

  const router = useRouter()

  const userId = Array.isArray(router.query.userId)
    ? router.query.userId[0]
    : router.query.userId || '0'

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Anbar'}>
          {+userId ? (
            <AnbarItem userId={userId} />
          ) : (
            <div
              style={{
                margin: '10px auto',
                width: 300,
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h1>Анбар не найден</h1>
              <Link href={'/my'}>
                <button>Вернитесь в свой анбар</button>
              </Link>
            </div>
          )}
        </Layout>
      )}
    </>
  )
}

export default AnbarOnePage
