import Layout from '@/components/layout/Layout'
import BarnPageOrder from '@/components/templates/BarnsPage/Order/'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { useRouter } from 'next/router'

function BarnUserIdPage() {
  const { query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  console.log(query.userId)
  const userId = Number(query.userId)

  return (
    <>
      {shouldLoadContent ? (
        <Layout title="Anbar">
          <BarnPageOrder userId={userId} />
        </Layout>
      ) : (
        <div />
      )}
    </>
  )
}

export default BarnUserIdPage
