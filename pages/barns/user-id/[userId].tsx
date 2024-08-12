import Layout from '@/components/layout/Layout'
import BarnPageOrder from '@/components/templates/BarnsPage/Order/'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { useRouter } from 'next/router'

// Ваш компонент BarnUserIdPage
function BarnUserIdPage() {
  const { query } = useRouter()
  const { shouldLoadContent } = useRedirectByUserCheck()

  console.log(query)

  return (
    <>
      {shouldLoadContent ? (
        <Layout title="Anbar">{<BarnPageOrder userId={11} />}</Layout>
      ) : (
        <div />
      )}
    </>
  )
}

export default BarnUserIdPage
