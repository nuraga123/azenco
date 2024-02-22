import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import AnbarItem from '@/components/modules/AnbarPage/AnbarItem'

import '@/styles/globals.css'

function AnbarOnePage() {
  const { shouldLoadContent } = useRedirectByUserCheck()

  const router = useRouter()

  const userId = Array.isArray(router.query.anbarId)
    ? router.query.anbarId[0]
    : router.query.anbarId || '0'

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Anbar'}>
          <AnbarItem userId={userId} tableActions={false} />
        </Layout>
      )}
    </>
  )
}

export default AnbarOnePage
